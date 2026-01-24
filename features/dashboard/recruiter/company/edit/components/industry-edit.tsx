"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchAddDialog, SearchItem } from "@/features/dashboard/components/search-dialog";
import { Cross, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useGetCompanyIndustryList } from "../api/query";
import { IIndustryList } from "../api/types";
import { useAddIndustry } from "../api/mutation";
import { useGetCompanyIndustry, useGetMyComanyDetails } from "../../api/query";

const role = "CANDIDATE";

// const ALL_SKILLS = [
//     { value: "react", label: "React" },
//     { value: "java", label: "Java" },
//     { value: "javascript", label: "JavaScript" },
//     { value: "css", label: "CSS" },
//     { value: "python", label: "Python" },
// ];

export default function IndustryEdit() {
    // const [skillResults, setSkillResults] = useState<IIndustryList[]>();

    // const {data, isError, isLoading} = useGetCompanyIndustryList()

    // if(isLoading) return <div>Loading...</div>
    // if(isError) return <div>Error loading industries</div>

    //     console.log('industry list data.data', data.data)

    // // Function 1: Handle Skill Search
    // const handleSkillSearch = (query: string) => {
    //     // In a real app, this would be an API call
    //     const filtered = ALL_SKILLS.filter((s) =>
    //         s.label.toLowerCase().includes(query.toLowerCase())
    //     );
    //     setSkillResults(filtered);
    // };

    // // Function 2: Handle Skill Selection
    // const handleAddSkill = () => {
    //     console.log("Saving Skill to DB:");
    // };

    //================================================================

    // 1. STATE: Track the search text
    const [searchQuery, setSearchQuery] = useState("");

    // 2. DATA: Fetch the Master List of Industries
    const { data: industryData, isLoading } = useGetCompanyIndustryList();

    // 3. DATA: Fetch Your Company Details (To get your Company ID)
    const { data: companyData } = useGetMyComanyDetails();
    const company = companyData?.data?.[0]; // Access the company object

    //
    const { data: companyIndustryData, error } = useGetCompanyIndustry(company?.id);

    // 4. MUTATION: Hook to save the selection
    const { mutate: addIndustryMutate } = useAddIndustry();

    // 5. DERIVED STATE: Transform Real Data -> Search Items
    // We map your API format { id, name } to the UI format { id, value, label }
    const allIndustries = industryData?.data || [];

    const filteredResults: any[] = allIndustries
        .map((item) => ({
            id: item.id, // Keep original ID
            value: item.id, // Use ID as the value
            label: item.name, // Use 'name' as the visible label
        }))
        .filter((item) =>
            // Filter based on the label (Name)
            item.label.toLowerCase().includes(searchQuery.toLowerCase()),
        );

    // --- HANDLERS ---

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleAddIndustry = (item: SearchItem) => {
        if (!company?.id) {
            console.error("Company ID is missing!");
            return;
        }

        addIndustryMutate({
            companyId: company.id,
            industryId: Number(item.value), // Ensure we send a Number ID
            industryName: item.label,
        });
    };

    return (
        <Card className="max-w-4xl w-full py-4">
            <CardHeader className=" flex flex-row items-center justify-between px-4 min-h-9">
                <CardTitle className=" md:text-lg">Industries</CardTitle>
                <div className="flex gap-2">
                    {role === "CANDIDATE" && (
                        <SearchAddDialog
                            title="Industries"
                            inputLabel="Add Industry"
                            placeholder="e.g. Tech"
                            description=" "
                            trigger={
                                <Button variant={"outline"}>
                                    <Plus /> Add Industry
                                </Button>
                            }
                            // searchResults={data?.data || [] }
                            // onSearchChange={handleSkillSearch}
                            // onItemSelect={handleAddSkill}
                            searchResults={filteredResults}
                            onSearchChange={handleSearchChange}
                            onItemSelect={handleAddIndustry}
                        />
                    )}
                </div>
            </CardHeader>
            <CardContent className=" px-4">
                <div className="flex gap-2 flex-wrap">
                    {companyIndustryData?.data?.map((item) => (
                        <Badge key={item.id} className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm group cursor-pointer">
                            {item.industry?.name}
                            <X className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                    ))}
                </div>

                {/* {true && (
                    <div className="text-center py-12 text-muted-foreground rounded-md border-2 border-dashed border-border">
                        No skill added yet. Click "Add Skills" to get started.
                    </div>
                )} */}
            </CardContent>
        </Card>
    );
}
