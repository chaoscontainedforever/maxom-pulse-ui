
import { useState } from "react";
import BusinessAdminLayout from "@/components/BusinessAdmin/BusinessAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Edit, PlusCircle, Trash2 } from "lucide-react";

// Mock data for menu items
const mockMenuCategories = [
  "Starters", "Mains", "Sides", "Desserts", "Beverages"
];

const mockMenuItems = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    category: "Mains",
    price: 9.99,
    available: true,
  },
  {
    id: 2,
    name: "Onion Rings",
    category: "Sides",
    price: 4.99,
    available: true,
  },
  {
    id: 3,
    name: "Chocolate Milkshake",
    category: "Beverages",
    price: 5.99,
    available: true,
  },
  {
    id: 4,
    name: "Caesar Salad",
    category: "Starters",
    price: 7.99,
    available: true,
  },
  {
    id: 5,
    name: "Apple Pie",
    category: "Desserts",
    price: 6.99,
    available: false,
  }
];

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
};

const MenuEditor = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    category: "Mains",
    price: 0,
    available: true,
  });

  // Filter menu items based on selected category
  const filteredItems = selectedCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  // Handle availability toggle
  const handleAvailabilityToggle = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  // Handle item deletion
  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  // Handle adding a new item
  const handleAddItem = () => {
    const newId = Math.max(...menuItems.map(item => item.id)) + 1;
    setMenuItems([...menuItems, { id: newId, ...newItem }]);
    setNewItem({
      name: "",
      category: "Mains",
      price: 0,
      available: true,
    });
    setIsAddDialogOpen(false);
  };

  // Handle editing an existing item
  const handleEditItem = () => {
    if (editingItem) {
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
      setEditingItem(null);
      setIsEditDialogOpen(false);
    }
  };

  return (
    <BusinessAdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Menu Editor</h2>
          <p className="text-muted-foreground">
            Manage your restaurant's menu items
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {mockMenuCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="ml-auto">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Menu Item</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Menu Item</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new menu item.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value) => setNewItem({...newItem, category: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockMenuCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="available" className="text-right">Available</Label>
                    <Switch
                      id="available"
                      checked={newItem.available}
                      onCheckedChange={(checked) => setNewItem({...newItem, available: checked})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Switch
                            checked={item.available}
                            onCheckedChange={() => handleAvailabilityToggle(item.id)}
                          />
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Dialog open={isEditDialogOpen && editingItem?.id === item.id} onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (!open) setEditingItem(null);
                          }}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => {
                                  setEditingItem(item);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Menu Item</DialogTitle>
                                <DialogDescription>
                                  Update the details for this menu item.
                                </DialogDescription>
                              </DialogHeader>
                              {editingItem && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingItem.name}
                                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-category" className="text-right">Category</Label>
                                    <Select
                                      value={editingItem.category}
                                      onValueChange={(value) => setEditingItem({...editingItem, category: value})}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {mockMenuCategories.map(category => (
                                          <SelectItem key={category} value={category}>
                                            {category}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-price" className="text-right">Price ($)</Label>
                                    <Input
                                      id="edit-price"
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={editingItem.price}
                                      onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-available" className="text-right">Available</Label>
                                    <Switch
                                      id="edit-available"
                                      checked={editingItem.available}
                                      onCheckedChange={(checked) => setEditingItem({...editingItem, available: checked})}
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => {
                                  setEditingItem(null);
                                  setIsEditDialogOpen(false);
                                }}>
                                  Cancel
                                </Button>
                                <Button onClick={handleEditItem}>Save Changes</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No menu items found in this category
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessAdminLayout>
  );
};

export default MenuEditor;
