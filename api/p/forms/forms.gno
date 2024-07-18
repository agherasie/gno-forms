package forms

import (
	"std"
	"time"

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
	ID    string
	Owner std.Address

	Title       string
	Description string
	Fields      []Field

	CreatedAt time.Time
	OpenAt    time.Time
	CloseAt   time.Time
}

type Submission struct {
	FormID string

	Author std.Address

	/* ["Alex", 21, true, 0, [0, 1]] */
	Answers string // json

	SubmittedAt string
}

type FormDatabase struct {
	Forms []*Form

	Answers []*Submission

	IDCounter seqid.ID
}

func NewDatabase() *FormDatabase {
	return &FormDatabase{
		Forms:   make([]*Form, 0),
		Answers: make([]*Submission, 0),
	}
}

func (db *FormDatabase) GetForm(id string) *Form {
	for _, form := range db.Forms {
		if form.ID == id {
			return form
		}
	}
	return nil
}

func (db *FormDatabase) GetAnswer(formID string, author std.Address) *Submission {
	for _, answer := range db.Answers {
		if answer.FormID == formID && answer.Author.String() == author.String() {
			return answer
		}
	}
	return nil
}
