// src/routes/financial.js
const express = require('express');
const router = express.Router();
const { Sale, Account, Expense, Business } = require('../models');
const auth = require('../middleware/auth');
const { Op } = require('sequelize');

// Obtener dashboard financiero
router.get('/dashboard', auth, async (req, res) => {
  try {
    const { businessId } = req.user;
    const { startDate, endDate } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    } else {
      // Últimos 30 días por defecto
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      dateFilter.createdAt = { [Op.gte]: thirtyDaysAgo };
    }

    // Ventas
    const sales = await Sale.findAll({
      where: { businessId, ...dateFilter },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalSales'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalTransactions']
      ]
    });

    // Cuentas por cobrar
    const receivables = await Account.findAll({
      where: { 
        businessId, 
        type: 'receivable',
        status: 'pending',
        ...dateFilter
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalReceivable']
      ]
    });

    // Cuentas por pagar
    const payables = await Account.findAll({
      where: { 
        businessId, 
        type: 'payable',
        status: 'pending',
        ...dateFilter
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalPayable']
      ]
    });

    // Gastos
    const expenses = await Expense.findAll({
      where: { businessId, ...dateFilter },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalExpenses']
      ]
    });

    // Ventas por día (para gráfico)
    const dailySales = await Sale.findAll({
      where: { businessId, ...dateFilter },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalAmount'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'transactionCount']
      ],
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']]
    });

    // Productos más vendidos
    const topProducts = await SaleProduct.findAll({
      include: [{
        model: Sale,
        where: { businessId, ...dateFilter }
      }, {
        model: Product,
        attributes: ['name']
      }],
      attributes: [
        'productId',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity'],
        [sequelize.fn('SUM', sequelize.col('unitPrice')), 'totalRevenue']
      ],
      group: ['productId'],
      order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
      limit: 10
    });

    res.json({
      summary: {
        totalSales: parseFloat(sales[0]?.dataValues.totalSales || 0),
        totalTransactions: parseInt(sales[0]?.dataValues.totalTransactions || 0),
        totalReceivable: parseFloat(receivables[0]?.dataValues.totalReceivable || 0),
        totalPayable: parseFloat(payables[0]?.dataValues.totalPayable || 0),
        totalExpenses: parseFloat(expenses[0]?.dataValues.totalExpenses || 0),
        netProfit: parseFloat(sales[0]?.dataValues.totalSales || 0) - 
                  parseFloat(expenses[0]?.dataValues.totalExpenses || 0)
      },
      charts: {
        dailySales,
        topProducts
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reporte detallado de ventas
router.get('/sales-report', auth, async (req, res) => {
  try {
    const { businessId } = req.user;
    const { startDate, endDate, groupBy = 'day' } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    let groupByClause;
    switch (groupBy) {
      case 'day':
        groupByClause = [sequelize.fn('DATE', sequelize.col('createdAt'))];
        break;
      case 'week':
        groupByClause = [sequelize.fn('WEEK', sequelize.col('createdAt'))];
        break;
      case 'month':
        groupByClause = [sequelize.fn('MONTH', sequelize.col('createdAt'))];
        break;
      default:
        groupByClause = [sequelize.fn('DATE', sequelize.col('createdAt'))];
    }

    const salesReport = await Sale.findAll({
      where: { businessId, ...dateFilter },
      attributes: [
        ...groupByClause,
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalSales'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'transactionCount'],
        [sequelize.fn('AVG', sequelize.col('totalAmount')), 'averageSale']
      ],
      group: groupByClause,
      order: [groupByClause[0], 'ASC']
    });

    res.json(salesReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Estado de flujo de caja
router.get('/cash-flow', auth, async (req, res) => {
  try {
    const { businessId } = req.user;
    const { startDate, endDate } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const cashIn = await Account.findAll({
      where: { 
        businessId, 
        type: 'receivable',
        status: 'paid',
        ...dateFilter
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalCashIn']
      ]
    });

    const cashOut = await Expense.findAll({
      where: { businessId, ...dateFilter },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalCashOut']
      ]
    });

    const outstandingReceivables = await Account.findAll({
      where: { 
        businessId, 
        type: 'receivable',
        status: 'pending'
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalOutstanding']
      ]
    });

    res.json({
      cashIn: parseFloat(cashIn[0]?.dataValues.totalCashIn || 0),
      cashOut: parseFloat(cashOut[0]?.dataValues.totalCashOut || 0),
      netCashFlow: parseFloat(cashIn[0]?.dataValues.totalCashIn || 0) - 
                  parseFloat(cashOut[0]?.dataValues.totalCashOut || 0),
      outstandingReceivables: parseFloat(outstandingReceivables[0]?.dataValues.totalOutstanding || 0)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;