import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  HeartIcon,
  TrashIcon,
  AlertTriangleIcon,
  UserIcon,
} from "lucide-react";

interface GuestDetailsDialogProps {
  guest: Guest;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (guestId: string) => void;
}

interface Guest {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  email: string;
  phone: string;
  nationality: string;
  status: "Atual" | "Recente" | "Anterior";
  lastStay: string;
  totalStays: number;
  preferences: string[];
}

export function GuestDetailsDialog({
  guest,
  open,
  onOpenChange,
  onDelete,
}: GuestDetailsDialogProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteClick = () => {
    if (guest.status === "Atual") {
      setDeleteError(
        "Não é possível excluir um hóspede com hospedagem ativa ou reservas pendentes."
      );
      return;
    }

    setDeleteError(null);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete(guest.id);
    setShowDeleteDialog(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalhes do Hóspede</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={guest.avatar} alt={guest.name} />
                <AvatarFallback className="text-lg">
                  {guest.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{guest.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className={
                      guest.status === "Atual"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                        : guest.status === "Recente"
                        ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
                        : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800"
                    }
                  >
                    {guest.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {guest.nationality}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-sm">{guest.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Telefone</h3>
                  <p className="text-sm">{guest.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Nacionalidade</h3>
                  <p className="text-sm">{guest.nationality}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Última Estadia</h3>
                  <p className="text-sm">{guest.lastStay}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <p className="text-sm">{guest.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Total de Estadias</h3>
                  <p className="text-sm">{guest.totalStays}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <HeartIcon className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Preferências</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {guest.preferences.map((pref, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {pref}
                  </Badge>
                ))}
                {guest.preferences.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma preferência registrada
                  </p>
                )}
              </div>
            </div>

            {deleteError && (
              <div className="bg-destructive/10 p-3 rounded-md border border-destructive/20">
                <div className="flex items-start gap-2">
                  <AlertTriangleIcon className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-destructive">
                      Não é possível excluir este hóspede
                    </p>
                    <p className="text-xs text-destructive/80 mt-0.5">
                      {deleteError}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between items-center">
            <Button
              variant="destructive"
              onClick={handleDeleteClick}
              className="gap-1"
            >
              <TrashIcon className="h-4 w-4" />
              Excluir Hóspede
              {guest.status === "Atual" && (
                <AlertTriangleIcon className="h-4 w-4 ml-1" />
              )}
            </Button>
            <Button onClick={() => onOpenChange(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o hóspede {guest.name}? Esta ação
              não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
