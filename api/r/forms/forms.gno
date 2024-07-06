package forms

import (
	"gno.land/p/demo/forms" 
	"gno.land/p/demo/ufmt"
)

var db *forms.FormDatabase

func init() {
	db = forms.NewDatabase()
}

func CreateForm(title string, description string, openAt string, closeAt string, data string) string {
	return db.CreateForm(title, description, openAt, closeAt, data)
}

func SubmitForm(formID string, answers string) {
	form := db.GetForm(formID)
	if form == nil {
		panic(ufmt.Errorf("Form not found: %s", formID))
	}
	
	db.SubmitForm(formID, answers)
}

func Render(path string) string {
	response := ""

	for _, form := range db.Forms {
		response += "\nID: " + form.ID + "\n"
	}

	return response
}