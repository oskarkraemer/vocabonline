import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"

  export function WarningModal(params: { title: string, children: React.ReactNode, acceptedStore: boolean, setAcceptedStore: Function}) {

    if(!params.acceptedStore) {
      return (
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive font-bold text-xl">{params.title}</AlertDialogTitle>
              <AlertDialogDescription className="text-sm lg:text-base font-normal">
                {params.children}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => params.setAcceptedStore(true)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    } else {
      return (<></>);
    }
  }
  