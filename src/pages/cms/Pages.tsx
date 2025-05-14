
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { FileText, Edit, Plus } from "lucide-react";

// Mock data for pages
const mockPages = [
  { id: '1', slug: 'home', title: 'Home Page', published: true, updatedAt: '2025-05-10' },
  { id: '2', slug: 'about', title: 'About Us', published: true, updatedAt: '2025-05-08' },
  { id: '3', slug: 'services', title: 'Our Services', published: true, updatedAt: '2025-05-01' },
  { id: '4', slug: 'contact', title: 'Contact Us', published: true, updatedAt: '2025-04-28' },
  { id: '5', slug: 'blog', title: 'Blog', published: false, updatedAt: '2025-05-12' },
];

export default function CMSPages() {
  const [pages, setPages] = useState(mockPages);

  const togglePublished = (id: string) => {
    setPages(prev => prev.map(page => 
      page.id === id ? { ...page, published: !page.published } : page
    ));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Pages</h2>
        <Button asChild>
          <Link to="/cms/pages/new">
            <Plus className="mr-2 h-4 w-4" /> New Page
          </Link>
        </Button>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Page</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map(page => (
              <TableRow key={page.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  {page.title}
                </TableCell>
                <TableCell>/{page.slug}</TableCell>
                <TableCell>{page.updatedAt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={page.published} 
                      onCheckedChange={() => togglePublished(page.id)}
                    />
                    <span className={page.published ? "text-green-600" : "text-gray-500"}>
                      {page.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/cms/pages/edit/${page.slug}`}>
                      <Edit className="h-4 w-4" /> Edit
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
