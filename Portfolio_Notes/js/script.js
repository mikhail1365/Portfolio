const App = {
  data() {
    return {
      counter: 0,
      title: 'Список заметок',
      inputValue: '',
      searchForNotes: '',
      notesHeads: [],
      notesContents: [],
      NotesShortContent: [],
      colorText: [],
      flagColorText: true,
      flagShow: [],
      flags: { editingFieldActive: false },
      shownNoteInd: null,
      ShownInputValue: null,
      headLen: 8,
      shortContentLen: 30,

    }
  },
  methods: {
    saveChangedNotes(ind) {
      [head, ShortContent] = this.getNoteShortContentHead(this.ShownInputValue);
      this.notesHeads[ind] = head;
      this.notesContents[ind] = this.ShownInputValue;
      this.NotesShortContent[ind] = ShortContent;
    },

    addNote(event) {
      if (this.inputValue !== '') {
        let head, ShortContent;
        [head, ShortContent] = this.getNoteShortContentHead(this.inputValue);
        this.notesHeads.push(head);
        this.notesContents.push(this.inputValue);
        this.NotesShortContent.push(ShortContent);
        this.colorText.push(null);
        this.flagShow.push(true);
        this.inputValue = '';
        this.flags.editingFieldActive = false;

        if (this.searchForNotes.length > 0) this.makeColorText(this.searchForNotes);
      }
    },

    getIndexBeforeSlash(content) {
      for (let j = 0; j < content.length; j++) if (content[j] === '\n') return j;
      return null;
    },
    getNoteShortContentHead(content, flagHeadOnly = false) {

      let indexSlash1, indexSlash2;
      indexSlash1 = this.getIndexBeforeSlash(content);
      let head = content, ShortContent = '';
      if (indexSlash1 !== null) {
        ShortContent = content.slice(indexSlash1 + 1)
        head = content.slice(0, indexSlash1)
      };
      if (head.length > this.headLen) head = head.slice(0, this.headLen) + '...';
      if (flagHeadOnly) return head

      if (ShortContent != '') {
        indexSlash2 = this.getIndexBeforeSlash(ShortContent);
        if (indexSlash2 !== null) ShortContent = ShortContent.slice(0, indexSlash2);
      }
      if (ShortContent.length > this.shortContentLen) ShortContent = ShortContent.slice(0, this.shortContentLen) + '...';
      return [head, ShortContent];
    },
    showNote(ind, event) {
      if ((this.flags.editingFieldActive == true) && (this.inputValue == '')) this.flags.editingFieldActive = false;
      if (!event.target.classList.contains('rmv-button')) {
        let liItem = event.target.closest('.list__item');
        let liareaItem = event.target.closest('.editing-note');
        liItem.classList.add('shownNote')
        let flagSameNote = ((this.shownNoteInd == ind) && (ind !== null));
        if ((flagSameNote) && (!liareaItem)) this.shownNoteInd = null;
        else {
          this.shownNoteInd = ind;
        }
        liareaItem = event.target.closest('.editing-note');
      }
    },
    changeShownInputValueRepeat(event, ind) {
      if (event.repeat) this.changeShownInputValue(ind)
    },
    changeShownInputValue(ind) {
      this.shownNoteInd = ind;
      this.ShownInputValue = this.notesContents[ind];
      this.notesHeads[ind] = this.getNoteShortContentHead(this.notesContents[ind], true);
    },
    closeShownNotes() {
        this.shownNoteInd = null;
    },
    closeOpenedEditings(event) {
      let OpenedNote = document.querySelector('.editing-note');
      if (OpenedNote) {
        if (!event.target.closest('.container'))
          if (OpenedNote.hasAttribute('fieldtype')) {
            if (OpenedNote.getAttribute('fieldtype') == 'showingNote') {
              this.shownNoteInd = null;
            }
          }
      }
    },
    closeAddingWindow(){
      this.flags.editingFieldActive = false;
      
    },
    removeNote(ind, event) {
      this.notesHeads.splice(ind, 1);
      this.notesContents.splice(ind, 1);
      this.NotesShortContent.splice(ind, 1);
      this.colorText.splice(ind, 1);
      this.flagShow.splice(ind, 1);
    },

    toUpperCase(item) {
      return item.toUpperCase();
    },
    changeFlagState(flag) {
      for (let key in this.flags) {
        if (String(key) == flag) {
          this.flags[key] = Boolean(1 - Number(this.flags[key]));
          return
        }
      }
    },
    addingNoteAfterCreatingNewNote() {
      let possibleNote = document.querySelector('.editing-note');
      if (possibleNote) this.addNote();
    },
    addingNoteAfterEscaping(event) {
      if (this.inputValue !== '') {
        if (!event.target.closest('.editing-note')) this.addNote();
      }
    },

    async getFlagShow(ind) {
      return this.flagShow[ind]
    },
    getID(ind) {
      return ind * this.headLen + 1;
    },
    makeColorTextImpossible(){

      for (let j = 0; j < this.notesHeads.length; j++) {
        this.colorText[j] = null;
        this.flagShow[j] = true;
        document.getElementById(`${this.getID(j)}`).firstChild.lastChild.innerHTML = this.notesHeads[j];
        document.getElementById(`${this.getID(j)}`).style.display = 'flex';
      }
      
      this.flagColorText = false;
    },
    makeColorTextPossible(){
      this.flagColorText = true;
      if (this.searchForNotes.length > 0) this.makeColorText(this.searchForNotes);

    },
    colorElement(content, value, maxLen = this.headLen**5){
      let valueInd = content.indexOf(value);
      let lenOfVal = value.length;
      if (valueInd !== -1) return content.slice(0, valueInd) + `<span style="color: red">${content.slice(valueInd, valueInd + lenOfVal)}</span>` + content.slice(valueInd + lenOfVal);
      else if (content.length < maxLen) return content
      else return content.slice(0, maxLen);
    },
    async makeColorText(value){
  
      let lenOfVal = value.length;
      let indArray = [];
      let leng = this.notesContents.length;
      for (let j = 0; j < leng; j++) indArray.push(j * 100 + 1);

      let WaitingForLastNote = await document.getElementById(` ${this.getID(leng)}`);
      if (lenOfVal > 0) {
        for (let index = 0; index < leng; index++) {

          let valueInd = this.notesContents[index].indexOf(value);
          if (valueInd === -1) {
            this.flagShow[index] = false;
            document.getElementById(`${this.getID(index)}`).style.display = 'none';
          }
          else {
            this.flagShow[index] = true;
            document.getElementById(`${this.getID(index)}`).style.display = 'flex';
            let colorHead = document.getElementById(`${this.getID(index)}`).firstChild.lastChild;
            colorHead.innerHTML = '';
            let headContent = this.notesHeads[index];
            let newElHead = document.createElement('span');
            newElHead.innerHTML = this.colorElement(headContent, value);
            colorHead.prepend(newElHead);
          }
        }
      }

    }
  },
  
  computed: {
    doubleCountComputed() {
      return this.notesHeads.length * 2
    },
  },

  watch: {
    searchForNotes(value) {
      if (this.flagColorText) {
        this.makeColorText(value);
        if (value == '') {
          this.makeColorTextImpossible();
          this.flagColorText = true;
        }
      }
    },


  },
  shownNoteInd(value) {
    if (value === null) {
      if (this.ShownInputValue == '') this.removeNote(this.shownNoteInd);
    }
  }
}

const createdApp = Vue.createApp(App)
  .component('my-component', {
    template: '<p class="foo bar">Привет</p>'
  })
createdApp.mount('#app');
