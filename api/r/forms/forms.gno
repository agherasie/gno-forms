package forms

import (
	"gno.land/p/demo/forms" 
)

var db *forms.FormDatabase

func init() {
	db = forms.NewDatabase()
}

func CreateForm(title string, description string, openAt string, closeAt string, data string) string {
	return db.CreateForm(title, description, openAt, closeAt, data)
}

func Render(path string) string {
	response := ""

	for _, form := range db.Forms {
		response += "\nID: " + form.ID + "\n"
	}

	return response
}