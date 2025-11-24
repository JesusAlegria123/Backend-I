const ClienteModel = require('../models/cliente.model');

const getClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.obtenerClientes();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ mensaje: 'Error al obtener clientes', error: error.message });
    }
};

const getClienteById = async (req, res) => {
    try {
        const cliente = await ClienteModel.obtenerClientePorId(req.params.id);
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        res.status(500).json({ mensaje: 'Error al obtener cliente', error: error.message });
    }
};

const createCliente = async (req, res) => {
    try {
        const { nombre, documento_identidad, direccion, telefono } = req.body;
        
        if (!nombre || !documento_identidad) {
            return res.status(400).json({ mensaje: 'Nombre y documento son requeridos' });
        }

        const clienteId = await ClienteModel.crearCliente(req.body);
        res.status(201).json({ 
            mensaje: 'Cliente creado exitosamente', 
            id: clienteId 
        });
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ mensaje: 'Error al crear cliente', error: error.message });
    }
};

const updateCliente = async (req, res) => {
    try {
        const affectedRows = await ClienteModel.actualizarCliente(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ mensaje: 'Error al actualizar cliente', error: error.message });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const affectedRows = await ClienteModel.eliminarCliente(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ mensaje: 'Error al eliminar cliente', error: error.message });
    }
};

module.exports = {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
