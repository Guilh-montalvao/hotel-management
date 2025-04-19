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
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, ImageIcon, UploadIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AddRoomDialogProps {
  onAddRoom?: (room: {
    number: string;
    type: "Standard" | "Deluxe" | "Suite";
    status: "Available" | "Occupied" | "Maintenance";
    rate: number;
    description: string;
    image?: string;
  }) => void;
}

export function AddRoomDialog({ onAddRoom }: AddRoomDialogProps) {
  const [open, setOpen] = useState(false);
  const [roomData, setRoomData] = useState({
    number: "",
    type: "Standard" as "Standard" | "Deluxe" | "Suite",
    status: "Available" as "Available" | "Occupied" | "Maintenance",
    rate: 100, // Preço padrão inicial
    description: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preços padrão baseados no tipo de quarto
  const defaultRates = {
    Standard: 100,
    Deluxe: 150,
    Suite: 200,
  };

  const handleChange = (field: string, value: string | number) => {
    setRoomData((prev) => {
      // Se o campo for tipo, atualizar a diária com o valor padrão
      if (field === "type" && typeof value === "string") {
        return {
          ...prev,
          [field]: value,
          rate: defaultRates[value as keyof typeof defaultRates],
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
        setRoomData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (onAddRoom) {
      onAddRoom(roomData);
    }
    // Reset form
    setRoomData({
      number: "",
      type: "Standard",
      status: "Available",
      rate: defaultRates.Standard,
      description: "",
      image: "",
    });
    setPreviewImage("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 h-4 w-4" />
          Adicionar Quarto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Quarto</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo quarto a ser adicionado ao sistema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Número
            </Label>
            <Input
              id="number"
              value={roomData.number}
              onChange={(e) => handleChange("number", e.target.value)}
              className="col-span-3"
              placeholder="Ex: 101"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <Select
              value={roomData.type}
              onValueChange={(value) =>
                handleChange("type", value as "Standard" | "Deluxe" | "Suite")
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Padrão (R$100)</SelectItem>
                <SelectItem value="Deluxe">Luxo (R$150)</SelectItem>
                <SelectItem value="Suite">Suíte (R$200)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={roomData.status}
              onValueChange={(value) =>
                handleChange(
                  "status",
                  value as "Available" | "Occupied" | "Maintenance"
                )
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Disponível</SelectItem>
                <SelectItem value="Occupied">Ocupado</SelectItem>
                <SelectItem value="Maintenance">Manutenção</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rate" className="text-right">
              Diária (R$)
            </Label>
            <Input
              id="rate"
              type="number"
              value={roomData.rate}
              onChange={(e) => handleChange("rate", Number(e.target.value))}
              className="col-span-3"
              placeholder="Ex: 150"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={roomData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
              placeholder="Ex: Cama queen, vista para a cidade, 25m²"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Imagem
            </Label>
            <div className="col-span-3">
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {previewImage ? (
                <Card
                  className="cursor-pointer overflow-hidden"
                  onClick={handleImageClick}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Button
                  variant="outline"
                  className="w-full h-32 flex flex-col gap-2 justify-center items-center"
                  onClick={handleImageClick}
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Clique para adicionar imagem
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
