# visitormanager
NodeJS API to manage the visitor

## API LOOKUP
	Method  : GET
	API URL : http://localhost:4200/api/visitorLookup

## API OWNER DETAILS
	Method  : GET
	API URL : http://localhost:4200/api/ownerDetails

## API VISITOR DETAILS
	Method : GET
	PARAMETERS : dateFrom and dateTo
	API URL    : http://localhost:4200/api/visitorDetails
	
## API SAVE VISITOR DETAILS
	Method : POST
	PARAMETERS : PHOTO, firstname, lastname, PHONE, Identity, IdentityNumber, Source, Destination, VisitingTo, In_Date, In_Time
	API URL    : http://localhost:4200/api/visitorManagement
	
## API SAVE OWNER DETAILS
	Method : POST
	PARAMETERS : PHOTO, firstname, lastname, flatnumber, PHONE, Identity, IdentityNumber
	API URL    : http://localhost:4200/api/saveOwner
	
## Note 
   Date Format : DD/MM/YYYY 
   Time Format : 10:51 AM
   
## PARAMETERS Naming Conventions
	"type", "code", "firstName", "lastName", "Phone", "Identity", "Driving License", "IdentityNumber","image", "Society", "Source", "Destination", "VisitingTo", "In_Date", "In_Time", "Out_Date", "Out_Time"