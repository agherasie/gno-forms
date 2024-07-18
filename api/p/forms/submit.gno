package forms

import (
	"std"
	"time"

	"gno.land/p/demo/ufmt"
)

func (db *FormDatabase) SubmitForm(formID string, answers string) {
	form := db.GetForm(formID)
	if form == nil {
		panic(ufmt.Errorf("Form not found: %s", formID))
	}

	previousAnswer := db.GetAnswer(formID, std.PrevRealm().Addr())
	if previousAnswer == nil {
		panic("You already submitted this form")
	}

	if time.Now().Before(form.OpenAt) {
		panic("Form is not open yet")
	} else if time.Now().After(form.CloseAt) {
		panic("Form is closed")
	}

	if ValidateAnswers(answers, form.Fields) == false {
		panic("Invalid answers")
	}

	answer := &Submission{
		FormID:      formID,
		Answers:     answers,
		Author:      std.PrevRealm().Addr(),
		SubmittedAt: time.Now().String(),
	}

	db.Answers = append(db.Answers, answer)
}

