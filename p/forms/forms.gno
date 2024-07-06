package forms

import ( 
	"time" 
	"std"
	
	"gno.land/p/demo/ufmt"
	"gno.land/p/demo/json"
	"gno.land/p/demo/seqid"
)

type Field struct {
	Label string

	/* 
	string: "string";
	number: "number";
	boolean: "boolean";
	choice: "['Pizza', 'Schnitzel', 'Burger']";
	multi-choice: "{'Pizza', 'Schnitzel', 'Burger'}";
	*/
	FieldType string

	Required bool
}

type Form struct {
	ID	 string
	Owner std.Address
	
	Title string
	Description string
	Fields []Field
	
	CreatedAt string
	OpenAt string
	CloseAt string
}

type Answers struct {
	FormID string

	Author std.Address
	
	/* ["Alex", 21, true, 0, [0, 1]] */
	Answers string // json
}

type FormDatabase struct {
	Forms []*Form
	
	Answers []*Answers

	IDCounter seqid.ID
}

func (form *Form) AddField(label string, fieldType string, required bool) {
	field := Field{
		Label: label,
		FieldType: fieldType,
		Required: required,
	}

	form.Fields = append(form.Fields, field)
}

func (db *FormDatabase) CreateForm(title string, description string, openAt string, closeAt string, data string) string {
	id := db.IDCounter.Next().String()

	form := &Form{
		ID: id,
		Owner: std.PrevRealm().Addr(),
		Title: title,
		Description: description,
		CreatedAt: time.Now().String(),
		OpenAt: openAt,
		CloseAt: closeAt,
	}

	db.Forms = append(db.Forms, form)

    node, err := json.Unmarshal([]byte(`{"foo": "var"}`))
    if err != nil {
        ufmt.Errorf("error: %v", err)
    }
    ufmt.Println(node)

	return id	
}