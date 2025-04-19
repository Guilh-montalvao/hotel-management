"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FilterIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  UsersIcon,
  XCircleIcon,
} from "lucide-react";
import { GuestDetailsDialog } from "./guest-details-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { AddGuestDialog } from "./add-guest-dialog";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>(guestData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>(guestData);

  const handleAddGuest = (newGuest: Guest) => {
    setGuests((prevGuests) => [...prevGuests, newGuest]);
    toast({
      title: "Hóspede adicionado",
      description: `${newGuest.name} foi adicionado com sucesso.`,
    });
  };

  const handleDeleteGuest = (guestId: string) => {
    // Verificar se o hóspede está com hospedagem ativa ou tem reservas
    const guest = guests.find((g) => g.id === guestId);

    if (guest?.status === "Atual") {
      toast({
        title: "Não foi possível excluir",
        description:
          "Não é possível excluir um hóspede com hospedagem ativa ou reservas pendentes.",
        variant: "destructive",
      });
      return;
    }

    // Se passou na verificação, excluir o hóspede
    setGuests((prevGuests) =>
      prevGuests.filter((guest) => guest.id !== guestId)
    );
    toast({
      title: "Hóspede excluído",
      description: `O hóspede foi excluído com sucesso.`,
    });
  };

  // Função para limpar os filtros
  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  // Filtrar os hóspedes de acordo com os critérios
  useEffect(() => {
    let result = [...guests];

    // Aplicar filtro de pesquisa
    if (searchTerm) {
      result = result.filter(
        (guest) =>
          guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guest.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guest.nationality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro de status
    if (statusFilter !== "all") {
      result = result.filter((guest) => {
        if (statusFilter === "atual") return guest.status === "Atual";
        if (statusFilter === "recente") return guest.status === "Recente";
        if (statusFilter === "anterior") return guest.status === "Anterior";
        return true;
      });
    }

    setFilteredGuests(result);
  }, [guests, searchTerm, statusFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Gestão de Hóspedes
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <AddGuestDialog onAddGuest={handleAddGuest} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Hóspedes
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{guests.length}</div>
            <p className="text-xs text-muted-foreground">
              Todos os hóspedes registrados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hóspedes Atuais
            </CardTitle>
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
            >
              Atual
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guests.filter((g) => g.status === "Atual").length}
            </div>
            <p className="text-xs text-muted-foreground">Hospedados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Visitas Recentes
            </CardTitle>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
            >
              Recente
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guests.filter((g) => g.status === "Recente").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Visitas nos últimos 30 dias
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novos Registros
            </CardTitle>
            <PlusIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Diretório de Hóspedes</CardTitle>
              <CardDescription>
                Visualize e gerencie perfis de hóspedes
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-[250px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar hóspedes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Hóspedes</SelectItem>
                  <SelectItem value="atual">Hóspedes Atuais</SelectItem>
                  <SelectItem value="recente">Hóspedes Recentes</SelectItem>
                  <SelectItem value="anterior">Hóspedes Anteriores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos os Hóspedes</TabsTrigger>
            <TabsTrigger value="current">Atuais</TabsTrigger>
            <TabsTrigger value="recent">Recentes</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {filteredGuests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hóspede</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Estadia</TableHead>
                    <TableHead>Total de Estadias</TableHead>
                    <TableHead>Preferências</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests.map((guest) => (
                    <GuestRow
                      key={guest.id}
                      guest={guest}
                      onDeleteGuest={handleDeleteGuest}
                    />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-4 flex flex-col items-center justify-center gap-2">
                <Alert variant="destructive" className="max-w-md">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Nenhum hóspede encontrado</AlertTitle>
                  <AlertDescription>
                    Nenhum hóspede corresponde aos filtros aplicados.
                  </AlertDescription>
                </Alert>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="mt-2"
                >
                  <XCircleIcon className="mr-2 h-4 w-4" />
                  Limpar Filtros
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="current" className="space-y-4">
            {filteredGuests.filter((guest) => guest.status === "Atual").length >
            0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hóspede</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Estadia</TableHead>
                    <TableHead>Total de Estadias</TableHead>
                    <TableHead>Preferências</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests
                    .filter((guest) => guest.status === "Atual")
                    .map((guest) => (
                      <GuestRow
                        key={guest.id}
                        guest={guest}
                        onDeleteGuest={handleDeleteGuest}
                      />
                    ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-4 flex flex-col items-center justify-center gap-2">
                <Alert variant="destructive" className="max-w-md">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Nenhum hóspede encontrado</AlertTitle>
                  <AlertDescription>
                    Nenhum hóspede atual corresponde aos filtros aplicados.
                  </AlertDescription>
                </Alert>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="mt-2"
                >
                  <XCircleIcon className="mr-2 h-4 w-4" />
                  Limpar Filtros
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {filteredGuests.filter((guest) => guest.status === "Recente")
              .length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hóspede</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Estadia</TableHead>
                    <TableHead>Total de Estadias</TableHead>
                    <TableHead>Preferências</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests
                    .filter((guest) => guest.status === "Recente")
                    .map((guest) => (
                      <GuestRow
                        key={guest.id}
                        guest={guest}
                        onDeleteGuest={handleDeleteGuest}
                      />
                    ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-4 flex flex-col items-center justify-center gap-2">
                <Alert variant="destructive" className="max-w-md">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Nenhum hóspede encontrado</AlertTitle>
                  <AlertDescription>
                    Nenhum hóspede recente corresponde aos filtros aplicados.
                  </AlertDescription>
                </Alert>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="mt-2"
                >
                  <XCircleIcon className="mr-2 h-4 w-4" />
                  Limpar Filtros
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function GuestRow({
  guest,
  onDeleteGuest,
}: {
  guest: Guest;
  onDeleteGuest?: (id: string) => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = () => {
    if (onDeleteGuest) {
      onDeleteGuest(guest.id);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={guest.avatar} alt={guest.name} />
            <AvatarFallback>{guest.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium flex items-center gap-1">
              {guest.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {guest.nationality}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{guest.email}</div>
        <div className="text-xs text-muted-foreground">{guest.phone}</div>
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>{guest.lastStay}</TableCell>
      <TableCell>{guest.totalStays}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {guest.preferences.map((pref, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {pref}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(true)}
        >
          Ver Detalhes
        </Button>
        <GuestDetailsDialog
          guest={guest}
          open={showDetails}
          onOpenChange={setShowDetails}
          onDelete={handleDelete}
        />
      </TableCell>
    </TableRow>
  );
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

const guestData: Guest[] = [
  {
    id: "g1",
    name: "João Silva",
    initials: "JS",
    email: "joao.s@exemplo.com",
    phone: "+55 (11) 1234-5678",
    nationality: "Brasil",
    status: "Atual",
    lastStay: "12/03/2024",
    totalStays: 5,
    preferences: ["Andar Alto", "Não Fumante", "Check-in Antecipado"],
  },
  {
    id: "g2",
    name: "Maria Santos",
    initials: "MS",
    email: "maria.s@exemplo.com",
    phone: "+55 (11) 9876-5432",
    nationality: "Brasil",
    status: "Atual",
    lastStay: "13/03/2024",
    totalStays: 2,
    preferences: ["Cama King", "Quarto Silencioso"],
  },
  {
    id: "g3",
    name: "Pedro Oliveira",
    initials: "PO",
    email: "pedro.o@exemplo.com",
    phone: "+55 (11) 4567-8901",
    nationality: "Brasil",
    status: "Atual",
    lastStay: "10/03/2024",
    totalStays: 8,
    preferences: [
      "Vista para o Mar",
      "Travesseiros Extras",
      "Check-out Tardio",
    ],
  },
  {
    id: "g4",
    name: "Ana Costa",
    initials: "AC",
    email: "ana.c@exemplo.com",
    phone: "+55 (11) 7890-1234",
    nationality: "Brasil",
    status: "Recente",
    lastStay: "05/03/2024",
    totalStays: 3,
    preferences: ["Vista para a Cidade", "Toalhas Extras"],
  },
  {
    id: "g5",
    name: "Carlos Lima",
    initials: "CL",
    email: "carlos.l@exemplo.com",
    phone: "+55 (11) 2345-6789",
    nationality: "Brasil",
    status: "Anterior",
    lastStay: "20/02/2024",
    totalStays: 1,
    preferences: ["Camas de Solteiro"],
  },
  {
    id: "g6",
    name: "Beatriz Souza",
    initials: "BS",
    email: "beatriz.s@exemplo.com",
    phone: "+55 (11) 3456-7890",
    nationality: "Brasil",
    status: "Recente",
    lastStay: "01/03/2024",
    totalStays: 4,
    preferences: ["Suíte", "Champanhe de Boas-vindas", "Transfer do Aeroporto"],
  },
];
