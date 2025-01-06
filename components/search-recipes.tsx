import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/lib/data/types";
import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface SearchRecipesProps {
  recipes: Recipe[];
  onSearch: (filteredRecipes: Recipe[]) => void;
}

export function SearchRecipes({ recipes, onSearch }: SearchRecipesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerms, setSearchTerms] = useState<string[]>([]);

  const filterRecipes = (terms: string[]) => {
    if (terms.length === 0) {
      onSearch(recipes);
      return;
    }

    const filtered = recipes.filter((recipe) => {
      return terms.every((term) => {
        const searchLower = term.toLowerCase();
        return (
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.name.toLowerCase().includes(searchLower)
          ) ||
          recipe.benefits.some((benefit) =>
            benefit.toLowerCase().includes(searchLower)
          )
        );
      });
    });
    onSearch(filtered);
  };

  const addSearchTerm = (term: string) => {
    if (term.trim() && !searchTerms.includes(term.trim())) {
      const newTerms = [...searchTerms, term.trim()];
      setSearchTerms(newTerms);
      filterRecipes(newTerms);
      setSearchTerm("");
    }
  };

  const removeSearchTerm = (termToRemove: string) => {
    const newTerms = searchTerms.filter((term) => term !== termToRemove);
    setSearchTerms(newTerms);
    filterRecipes(newTerms);
  };

  const clearAllTerms = () => {
    setSearchTerms([]);
    filterRecipes([]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm) {
      e.preventDefault();
      addSearchTerm(searchTerm);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='search'>Buscar Recetas</Label>
        <div className='flex gap-2'>
          <Input
            id='search'
            type='search'
            placeholder='Buscar por título, ingredientes o beneficios...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1'
          />
          <Button
            onClick={() => addSearchTerm(searchTerm)}
            disabled={!searchTerm.trim()}
          >
            Agregar
          </Button>
        </div>
      </div>

      {searchTerms.length > 0 && (
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='text-sm text-muted-foreground'>
              Filtros activos:
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={clearAllTerms}
              className='h-auto px-2 py-1'
            >
              Limpiar filtros
            </Button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {searchTerms.map((term, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='flex items-center gap-1'
              >
                {term}
                <button
                  onClick={() => removeSearchTerm(term)}
                  className='ml-1 rounded-full hover:bg-muted'
                >
                  <X className='h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
