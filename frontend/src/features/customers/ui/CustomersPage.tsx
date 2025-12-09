import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCustomers } from './useCustomers';
import { CreateCustomerModal } from './CreateCustomerModal';
import type { Customer } from '../domain/Customer';
import { CustomerRepository } from '../infrastructure/CustomerRepository';
import ConfirmDialog from '../../../ui/components/ConfirmDialog';

export const CustomersPage = () => {
  const { customers, loading, error, refresh } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
    setActionError(null);
  };

  const handleDelete = async () => {
    if (deleteId) {
      setActionError(null);
      try {
        const repo = new CustomerRepository();
        await repo.deleteCustomer(deleteId);
        refresh();
      } catch (err: any) {
        console.error('Error eliminando cliente', err);
        setActionError(err.message || 'Error al eliminar el cliente');
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  if (loading && customers.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Clientes
        </Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Nuevo Cliente
        </Button>
      </Box>

      {error && (
        <Box sx={{ mb: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {actionError && (
        <Box sx={{ mb: 4 }}>
          <Alert severity="error" onClose={() => setActionError(null)}>{actionError}</Alert>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Identificador</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>
                  {customer.name}
                  {customer.address && (
                    <Typography variant="caption" display="block" color="text.secondary">
                      {customer.address}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {customer.identifierType && customer.identifier ? (
                    <Typography variant="body2">
                      <strong>{customer.identifierType}:</strong> {customer.identifier}
                    </Typography>
                  ) : '-'}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(customer)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setDeleteId(customer.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay clientes registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateCustomerModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={refresh}
        customerToEdit={editingCustomer}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Eliminar Cliente"
        description="¿Estás seguro de que quieres eliminar este cliente? Esta acción eliminará permanentemente sus datos y citas asociadas."
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmColor="error"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </Box>
  );
};
