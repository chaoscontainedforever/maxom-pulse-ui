
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { FileText, Edit, Plus } from "lucide-react";

// Mock data for pages with sections
const mockPages = [
  { 
    id: '1', 
    slug: 'home', 
    title: 'Home Page', 
    published: true, 
    updatedAt: '2025-05-10',
    sections: ['home-hero', 'features', 'testimonials', 'contact-form']
  },
  { 
    id: '2', 
    slug: 'about', 
    title: 'About Us', 
    published: true, 
    updatedAt: '2025-05-08',
    sections: ['about-hero', 'team', 'vision']
  },
  { 
    id: '3', 
    slug: 'services', 
    title: 'Our Services', 
    published: true, 
    updatedAt: '2025-05-01',
    sections: ['services-hero', 'service-list', 'pricing']
  },
  { 
    id: '4', 
    slug: 'contact', 
    title: 'Contact Us', 
    published: true, 
    updatedAt: '2025-04-28',
    sections: ['contact-hero', 'contact-form', 'map']
  },
  { 
    id: '5', 
    slug: 'blog', 
    title: 'Blog', 
    published: false, 
    updatedAt: '2025-05-12',
    sections: ['blog-hero', 'blog-posts', 'categories']
  },
];

export default function CMSPages() {
  const [pages, setPages] = useState(mockPages);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  const togglePublished = (id: string) => {
    setPages(prev => prev.map(page => 
      page.id === id ? { ...page, published: !page.published } : page
    ));
  };

  const toggleExpand = (id: string) => {
    setExpandedPage(expandedPage === id ? null : id);
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
              <>
                <TableRow key={page.id} className="cursor-pointer" onClick={() => toggleExpand(page.id)}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    {page.title}
                  </TableCell>
                  <TableCell>/{page.slug}</TableCell>
                  <TableCell>{page.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
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
                    <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                      <Link to={`/cms/pages/edit/${page.slug}`}>
                        <Edit className="h-4 w-4 mr-1" /> Edit Page
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedPage === page.id && (
                  <TableRow>
                    <TableCell colSpan={5} className="bg-gray-50 py-3">
                      <div className="pl-8 space-y-2">
                        <h3 className="text-sm font-medium mb-2">Page Sections:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {page.sections.map((section) => (
                            <Link 
                              key={section}
                              to={`/cms/pages/edit/${section}`} 
                              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-sm"
                            >
                              <FileText className="h-4 w-4 text-maxom-violet" />
                              <span className="capitalize">{section.replace(/-/g, ' ')}</span>
                              <Edit className="h-3.5 w-3.5 text-gray-500 ml-auto" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
