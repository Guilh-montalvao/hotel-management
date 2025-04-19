import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, ImageIcon, XCircleIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AddGuestDialogProps {
  onAddGuest?: (guest: {
    id: string;
    name: string;
    initials: string;
    email: string;
    phone: string;
    nationality: string;
    status: "Atual" | "Recente" | "Anterior";
    lastStay: string;
    totalStays: number;
    preferences: string[];
    avatar?: string;
  }) => void;
}

export function AddGuestDialog({ onAddGuest }: AddGuestDialogProps) {
  const [open, setOpen] = useState(false);
  const [guestData, setGuestData] = useState({
    id: Math.random().toString(36).substring(2, 9),
    name: "",
    initials: "",
    email: "",
    phone: "",
    nationality: "Brasil",
    status: "Atual" as "Atual" | "Recente" | "Anterior",
    lastStay: new Date().toLocaleDateString(),
    totalStays: 1,
    preferences: [] as string[],
    avatar: "",
  });
  
  const [previewImage, setPreviewImage] = useState<string>("");
  const [preference, setPreference] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string | number | string[]) => {
    setGuestData((prev) => {
      // Se o campo for nome, atualizar também as iniciais
      if (field === "name") {
        const nameStr = value as string;
        if (!nameStr.trim()) {
          return {
            ...prev,
            [field]: value,
            initials: ""
          };
        }
        
        const nameParts = nameStr.split(" ").filter(part => part.length > 0);
        let initials = "";
        
        if (nameParts.length > 1 && nameParts[0][0] && nameParts[nameParts.length - 1][0]) {
          initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
        } else if (nameParts.length === 1 && nameParts[0][0]) {
          initials = nameStr.substring(0, Math.min(2, nameStr.length)).toUpperCase();
        }
        
        return {
          ...prev,
          [field]: value,
          initials
        };
      }
      
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        setGuestData((prev) => ({
          ...prev,
          avatar: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddPreference = () => {
    if (preference && !guestData.preferences.includes(preference)) {
      handleChange("preferences", [...guestData.preferences, preference]);
      setPreference("");
    }
  };

  const handleRemovePreference = (pref: string) => {
    handleChange(
      "preferences",
      guestData.preferences.filter((p) => p !== pref)
    );
  };

  const handleSubmit = () => {
    if (onAddGuest) {
      onAddGuest(guestData);
    }
    // Reset form
    setGuestData({
      id: Math.random().toString(36).substring(2, 9),
      name: "",
      initials: "",
      email: "",
      phone: "",
      nationality: "Brasil",
      status: "Atual",
      lastStay: new Date().toLocaleDateString(),
      totalStays: 1,
      preferences: [],
      avatar: "",
    });
    setPreviewImage("");
    setPreference("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 h-4 w-4" />
          Adicionar Hóspede
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Hóspede</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo hóspede a ser adicionado ao sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={guestData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
              placeholder="Ex: João Silva"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={guestData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="col-span-3"
              placeholder="Ex: joao.silva@exemplo.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Telefone
            </Label>
            <Input
              id="phone"
              value={guestData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="col-span-3"
              placeholder="Ex: +55 (11) 1234-5678"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nationality" className="text-right">
              Nacionalidade
            </Label>
            <Input
              id="nationality"
              value={guestData.nationality}
              onChange={(e) => handleChange("nationality", e.target.value)}
              className="col-span-3"
              placeholder="Ex: Brasil"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={guestData.status}
              onValueChange={(value) =>
                handleChange(
                  "status",
                  value as "Atual" | "Recente" | "Anterior"
                )
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Atual">Atual</SelectItem>
                <SelectItem value="Recente">Recente</SelectItem>
                <SelectItem value="Anterior">Anterior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalStays" className="text-right">
              Total de Estadias
            </Label>
            <Input
              id="totalStays"
              type="number"
              value={guestData.totalStays}
              onChange={(e) =>
                handleChange("totalStays", parseInt(e.target.value) || 0)
              }
              className="col-span-3"
              placeholder="Ex: 1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">
              Foto
            </Label>
            <div className="col-span-3">
              <Card
                className="cursor-pointer overflow-hidden"
                onClick={handleImageClick}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square w-full max-w-[150px] overflow-hidden rounded-md border">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Avatar preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-center text-xs text-white">
                      <span className="inline-block">Carregar foto</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="preferences" className="text-right pt-2">
              Preferências
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex gap-2">
                <Input
                  id="preferences"
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  placeholder="Ex: Andar Alto"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddPreference}
                >
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {guestData.preferences.map((pref, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-full bg-secondary px-3 py-1 text-xs"
                  >
                    {pref}
                    <XCircleIcon
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={() => handleRemovePreference(pref)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Adicionar Hóspede
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}