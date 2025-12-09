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
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useEmployees } from './useEmployees';
import { CreateEmployeeModal } from './CreateEmployeeModal';
import type { Employee } from '../domain/Employee';
import { EmployeeRepository } from '../infrastructure/EmployeeRepository';
import ConfirmDialog from '../../../ui/components/ConfirmDialog';

const ROLE_LABELS: Record<string, string> = {
  MECHANIC: 'Mecánico',
  ADMIN: 'Administrador',
  BACKOFFICE: 'Backoffice'
};

export const EmployeesPage = () => {
  const { employees, loading, error, refresh } = useEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
    setActionError(null);
  };

  const handleDelete = async () => {
    if (deleteId) {
      setActionError(null);
      try {
        const repo = new EmployeeRepository();
        await repo.deleteEmployee(deleteId);
        refresh();
      } catch (err: any) {
        console.error('Error eliminando empleado', err);
        setActionError(err.message || 'Error al eliminar el empleado');
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleRestore = async (id: number) => {
    setActionError(null);
    try {
      const repo = new EmployeeRepository();
      await repo.restoreEmployee(id);
      refresh();
    } catch (err: any) {
      console.error('Error restaurando empleado', err);
      setActionError(err.message || 'Error al restaurar el empleado');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  if (loading && employees.length === 0) {
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
          Empleados
        </Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Nuevo Empleado
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
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow 
                key={employee.id}
                sx={{ 
                  backgroundColor: employee.deletedAt ? '#ffebee' : 'inherit',
                  opacity: employee.deletedAt ? 0.7 : 1
                }}
              >
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.employeeCode || '-'}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{ROLE_LABELS[employee.role || 'MECHANIC'] || employee.role}</TableCell>
                <TableCell>{employee.dni || '-'}</TableCell>
                <TableCell>{employee.email || '-'}</TableCell>
                <TableCell>{employee.phone || '-'}</TableCell>
                <TableCell align="right">
                  {employee.deletedAt ? (
                    <IconButton 
                      onClick={() => handleRestore(employee.id)} 
                      color="success"
                      title="Restaurar"
                    >
                      <RestoreFromTrashIcon />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton 
                        onClick={() => handleEdit(employee)} 
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => setDeleteId(employee.id)} 
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateEmployeeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={refresh}
        employeeToEdit={editingEmployee}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Eliminar Empleado"
        description="¿Estás seguro de que quieres eliminar este empleado?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmColor="error"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </Box>
  );
};
