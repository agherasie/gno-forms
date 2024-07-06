package forms

import ( 
	"time" 
	"std"
	
	"gno.land/p/demo/ufmt"
)

func (db *FormDatabase) SubmitForm(formID string, answers string) {
	form := db.GetForm(formID)
	if form == nil {
		panic(ufmt.Errorf("Form not found: %s", formID))
	}

	if ValidateAnswers(answers, form.Fields) == false {
		panic("Invalid answers")
	}

	answer := &Submission{
		FormID: formID,
		Answers: answers,
		Author: std.PrevRealm().Addr(),
		SubmittedAt: time.Now().String(),
	}

	db.Answers = append(db.Answers, answer)
}