// src/services/FinancialService.js
const { Sale, Account, Expense, Product, SaleProduct } = require('../models');
const { Op } = require('sequelize');

class FinancialService {
  constructor(businessId) {
    this.businessId = businessId;
  }

  async getFinancialSummary(startDate, endDate) {
    try {
      const dateFilter = this._buildDateFilter(startDate, endDate);

      const [
        totalSales,
        totalExpenses,
        accountsReceivable,
        accountsPayable,
        profitMargin
      ] = await Promise.all([
        this._calculateTotalSales(dateFilter),
        this._calculateTotalExpenses(dateFilter),
        this._calculateAccountsReceivable(),
        this._calculateAccountsPayable(),
        this._calculateProfitMargin(dateFilter)
      ]);

      return {
        totalSales,
        totalExpenses,
        netProfit: totalSales - totalExpenses,
        accountsReceivable,
        accountsPayable,
        profitMargin,
        cashFlow: totalSales - totalExpenses,
        workingCapital: accountsReceivable - accountsPayable
      };
    } catch (error) {
      throw error;
    }
  }

  async getSalesTrends(timeframe = '30d') {
    try {
      const dateFilter = this._buildDateFilterForTimeframe(timeframe);

      const salesTrends = await Sale.findAll({
        where: { businessId: this.businessId, ...dateFilter },
        attributes: [
          [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
          [sequelize.fn('SUM', sequelize.col('totalAmount')), 'dailySales'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'transactionCount']
        ],
        group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
        order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']]
      });

      return salesTrends;
    } catch (error) {
      throw error;
    }
  }

  async getProductPerformance(startDate, endDate) {
    try {
      const dateFilter = this._buildDateFilter(startDate, endDate);

      const productPerformance = await SaleProduct.findAll({
        include: [{
          model: Sale,
          where: { businessId: this.businessId, ...dateFilter }
        }, {
          model: Product,
          attributes: ['name', 'cost']
        }],
        attributes: [
          'productId',
          [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold'],
          [sequelize.fn('SUM', sequelize.col('unitPrice')), 'totalRevenue'],
          [sequelize.fn('AVG', sequelize.col('unitPrice')), 'averagePrice']
        ],
        group: ['productId'],
        order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']]
      });

      // Calcular margen de ganancia
      const productsWithMargin = await Promise.all(
        productPerformance.map(async (item) => {
          const product = await Product.findByPk(item.productId);
          const totalCost = product.cost * item.dataValues.totalSold;
          const totalRevenue = parseFloat(item.dataValues.totalRevenue);
          const profitMargin = ((totalRevenue - totalCost) / totalRevenue) * 100;

          return {
            ...item.dataValues,
            productName: product.name,
            totalCost,
            profitMargin: isNaN(profitMargin) ? 0 : profitMargin,
            totalProfit: totalRevenue - totalCost
          };
        })
      );

      return productsWithMargin;
    } catch (error) {
      throw error;
    }
  }

  async getCashFlowStatement(startDate, endDate) {
    try {
      const dateFilter = this._buildDateFilter(startDate, endDate);

      const [operating, investing, financing] = await Promise.all([
        this._calculateOperatingCashFlow(dateFilter),
        this._calculateInvestingCashFlow(dateFilter),
        this._calculateFinancingCashFlow(dateFilter)
      ]);

      return {
        operating,
        investing,
        financing,
        netCashFlow: operating + investing + financing
      };
    } catch (error) {
      throw error;
    }
  }

  async generateFinancialReport(type, startDate, endDate) {
    try {
      const dateFilter = this._buildDateFilter(startDate, endDate);

      switch (type) {
        case 'income-statement':
          return await this._generateIncomeStatement(dateFilter);
        
        case 'balance-sheet':
          return await this._generateBalanceSheet();
        
        case 'cash-flow':
          return await this.getCashFlowStatement(startDate, endDate);
        
        default:
          throw new Error('Tipo de reporte no válido');
      }
    } catch (error) {
      throw error;
    }
  }

  // Métodos auxiliares privados
  async _calculateTotalSales(dateFilter) {
    const result = await Sale.findAll({
      where: { businessId: this.businessId, ...dateFilter },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalSales']
      ]
    });

    return parseFloat(result[0]?.dataValues.totalSales || 0);
  }

  async _calculateTotalExpenses(dateFilter) {
    const result = await Expense.findAll({
      where: { businessId: this.businessId, ...dateFilter },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalExpenses']
      ]
    });

    return parseFloat(result[0]?.dataValues.totalExpenses || 0);
  }

  async _calculateAccountsReceivable() {
    const result = await Account.findAll({
      where: { 
        businessId: this.businessId,
        type: 'receivable',
        status: 'pending'
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalReceivable']
      ]
    });

    return parseFloat(result[0]?.dataValues.totalReceivable || 0);
  }

  async _calculateAccountsPayable() {
    const result = await Account.findAll({
      where: { 
        businessId: this.businessId,
        type: 'payable',
        status: 'pending'
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalPayable']
      ]
    });

    return parseFloat(result[0]?.dataValues.totalPayable || 0);
  }

  async _calculateProfitMargin(dateFilter) {
    const sales = await this._calculateTotalSales(dateFilter);
    const expenses = await this._calculateTotalExpenses(dateFilter);
    
    if (sales === 0) return 0;
    return ((sales - expenses) / sales) * 100;
  }

  _buildDateFilter(startDate, endDate) {
    if (!startDate || !endDate) return {};

    return {
      createdAt: {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      }
    };
  }

  _buildDateFilterForTimeframe(timeframe) {
    const now = new Date();
    let startDate;

    switch (timeframe) {
      case '7d':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case '30d':
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case '90d':
        startDate = new Date(now.setDate(now.getDate() - 90));
        break;
      case 'ytd':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 30));
    }

    return {
      createdAt: {
        [Op.gte]: startDate
      }
    };
  }
}

module.exports = FinancialService;