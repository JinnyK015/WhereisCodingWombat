const CODINGWOMBAT_SIZE = 100

export default class Field {
    constructor(codingwombatCount, aardbarkCount) {
        this.codingwombatCount = codingwombatCount
        this.aardbarkCount =aardbarkCount

        this.field = document.querySelector('.game__field')
        this.fieldRect = this.field.getBoundingClientRect()
        this.field.addEventListener('click', this.onClick)
    }

    init() {
        this.field.innerHTML = ''
        this._addItem('codingWombat', this.codingwombatCount, 'img/codingWombat.gif')
        this._addItem('aardbark', this.aardbarkCount, 'img/aardbark.gif')
    }
    // underbar meaning is privit var, it's super outdate grammer, change with TypeScript later.

    setClickListener(onItemClick) {
      this.onItemClick =onItemClick
    }
    
    _addItem(className, count, imgPath) {
    const x1 = 0
    const y1 = 0
    const x2 = this.fieldRect.width - CODINGWOMBAT_SIZE
    const y2 = this.fieldRect.height - CODINGWOMBAT_SIZE
  
    for (let i = 0 ; i < count ; i++) {
      const item = document.createElement('img')
      item.setAttribute('class', className)
      item.setAttribute('src', imgPath)
      item.style.position = 'absolute'
      const x = randomNumber(x1, x2)
      const y = randomNumber(y1, y2)
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      this.field.appendChild(item)
    }
  }


    onClick(event) {
        const target = event.target
        if (target.matches('.codingWombat')) {
          target.remove()
          this.onItemClick &&  this.onItemClick('codingWombat')
          // onitemclick is seted callback, call callback methods.
        } else if (target.matches('.aardbark')) {
          this.onItemClick &&  this.onItemClick('aardbark')
        }
      }

}


function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}
