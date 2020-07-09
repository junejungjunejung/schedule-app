class Hangman {
  constructor(word, guessesLeft) {
    this.word = word.toLowerCase().split('')
    this.guesesLeft = guessesLeft
    this.guessedLetter = []
    this.status = 'playing'
  }

  get puzzle() {
    let string = ''
    this.word.forEach((letter) => {
      if (this.guessedLetter.includes(letter) || letter === ' '){
        string += letter
      } else {
        string += '*'
      }
    })
    return string
  }

  getStatus() {
    let finished = this.word.every((letter) => this.guessedLetter.includes(letter) || letter === ' ')

    if(this.guesesLeft === 0){
      this.status = 'failed'
    } else if (finished){
      this.status = 'finished'
    } else {
      this.status = 'playing'
    }
  };

  get statusMsg() {
    if(this.status === 'playing'){
      return `Guesses left: ${this.guesesLeft}.`
    } else if (this.status === 'failed'){
      return `Nice try. The word was "${this.word.join('')}".`
    } else {
      return 'Great work, You guessed the word.'
    }
  }

  makeGuess(letter) {
    letter = letter.toLowerCase()
    const isUnique = !this.guessedLetter.includes(letter)
    const isBadGuess = !this.word.includes(letter)
  
    if(this.status !== 'playing'){
      return
    }
  
    if(isUnique){
      this.guessedLetter.push(letter);
    }
  
    if(isUnique && isBadGuess){
      this.guesesLeft --
    }
  
    this.getStatus()
  }
} 