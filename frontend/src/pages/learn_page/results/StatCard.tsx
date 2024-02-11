import { Card, CardContent } from "@/components/ui/card";

export function StatCard(props: {children: React.ReactNode}) {
    return (
        <Card className="m-2 w-full sm:w-[350px]">
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    );
}