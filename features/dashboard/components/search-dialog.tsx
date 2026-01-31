import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";

// Define the shape of items in the list
export interface SearchItem {
    value: string;
    label: string;
}

interface SearchAddDialogProps {
    // UI Text Props
    title: string;
    description?: string;
    inputLabel: string;
    placeholder?: string;

    // Data & Events
    // dataObject: Object
    trigger: React.ReactNode; // The button that opens the modal
    searchResults: any[]; // The list of filtered items to show
    onSearchChange: (value: string) => void; // Function triggered on typing
    onItemSelect: (item: SearchItem) => void; // Function triggered on click

    // Optional loading state
    isLoading?: boolean;
}

export function SearchAddDialog({
    title,
    description,
    inputLabel,
    placeholder,
    trigger,
    searchResults,
    onSearchChange,
    onItemSelect,
    isLoading = false,
}: SearchAddDialogProps) {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (item: SearchItem) => {
        onItemSelect(item);
        setOpen(false); // Close dialog on selection
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            {/* sm:max-w allows responsiveness. The screenshots show a centered modal. */}
            <DialogContent className="sm:max-w-[600px] gap-6 top-[30%]">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold">{title}</DialogTitle>
                    {description && <DialogDescription className="text-center sr-only">{description}</DialogDescription>}
                </DialogHeader>

                <div className="grid gap-2">
                    <Label htmlFor="search-input" className="text-md font-medium">
                        {inputLabel}
                    </Label>

                    {/* shouldFilter={false} is CRITICAL here. 
             It tells Command NOT to filter the list itself, because YOU are doing 
             the filtering in the parent component via onSearchChange (likely an API call).
          */}
                    <Command shouldFilter={false} className="rounded-lg border shadow-sm">
                        <CommandInput id="search-input" placeholder={placeholder} onValueChange={onSearchChange} />

                        <CommandList>
                            {/* Show loading state if needed */}
                            {isLoading && <div className="p-4 text-sm text-center text-muted-foreground">Searching...</div>}

                            {/* Show empty state only if not loading and no results */}
                            {!isLoading && searchResults.length === 0 && (
                                <CommandEmpty className="py-6 text-center text-sm">No match found</CommandEmpty>
                            )}

                            {/* Render the list */}
                            {!isLoading && searchResults.length > 0 && (
                                <CommandGroup>
                                    {searchResults.map((item) => (
                                        <CommandItem
                                            key={item.value}
                                            value={item.label}
                                            onSelect={() => handleSelect(item)}
                                            className="cursor-pointer"
                                        >
                                            {item.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </div>
            </DialogContent>
        </Dialog>
    );
}
