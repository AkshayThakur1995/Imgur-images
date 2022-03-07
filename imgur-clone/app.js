// var myHeaders = {
//     "Content-Type": "text",
//     "Authorization": "Client-ID 343c8692df3cd2a",
    
// }
// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
  
// };
const paginate = (get) => {
  const itemsPerPage = 24;
  const numberOfPages = Math.ceil(get.length / itemsPerPage)
  console.log(numberOfPages)
  const newItem = Array.from({length: numberOfPages}, (_,index)=>{
    const start = index * itemsPerPage
    return get.slice(start, start + itemsPerPage)
  })
  return newItem
}
const pageClick = document.querySelector(".page-btn")

pageClick.addEventListener("click", handlebtn)
let pageno = 0
function handlebtn(e){
  if(e.target.innerText == 1){
  pageno = 0
  }else{
    pageno = e.target.innerText
  }
  e.target.classList.toggle("active")
   getImages(pageno)
   console.log(pageno)

}
let input = "india"
const search = document.querySelector(".search-txt")
const submitBtn = document.querySelector(".form-submit")



// trending card





if(submitBtn){
  submitBtn.addEventListener("click", 
    handlesubmit
  )
}
function handlesubmit(){
  input = search.value
  console.log("clicked")
  getImages(pageno)
}


const pageTwo = document.querySelector(".two")
pageTwo.addEventListener("click", handlebtn)
const pagethree = document.querySelector(".three")
pagethree.addEventListener("click", handlebtn)
const pageFour = document.querySelector(".four")
pageFour.addEventListener("click", handlebtn)
const pageFive = document.querySelector(".five")
pageFive.addEventListener("click", handlebtn)

let globaldata;
const getImages = async(pageno) => {
   const response = await fetch(`https://pixabay.com/api/?key=26014965-da1534dc1f60a2510e7b810a5&q=${input}&image_type=photo&per_page=200`, {referrer:""})
   const data = await response.json()
   
   const get = data.hits
   globaldata = data.hits
  let newarr = paginate(get)
  let newGet = newarr[pageno]
  console.log(newGet) 
  filldata(newGet)
}
getImages(pageno)



const ImageGrid = document.querySelector(".image-grid")
function filldata(newget){
  ImageGrid.innerText = ""
   newget.map((item) => {
       const ImageCard  = document.createElement("div")
       ImageCard.classList.add("grid-card")
       const cardImg = document.createElement("img")
       cardImg.src = item.largeImageURL
    const content = document.createElement("div")
    content.classList.add("grid-card-content")
    const title = document.createElement("p")
    title.innerText = item.tags;
    const cardicons = document.createElement("div")
    cardicons.classList.add("card-icons")
    const upvote = document.createElement("p")
    upvote.innerHTML = `<i class="fa-solid fa-arrow-up-long"></i> ${item.likes}`
    const down = document.createElement("p")
    down.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`
    const comment = document.createElement("p")
    comment.innerHTML = `<i class="fa-solid fa-message"></i> ${item.comments}`
    const eye = document.createElement("p")
    eye.innerHTML = `<i class="fa-solid fa-eye"></i> ${String(item.views).slice(0,2)}K`
    cardicons.append(upvote,down,comment,eye)
    content.append(title,cardicons)
    ImageCard.append(cardImg,content)
    ImageGrid.append(ImageCard)
    })
}
let trendCard = document.querySelectorAll(".trending-tag-card")
let trendWord = document.querySelectorAll(".word")
// let list = []
// for(let i = 0; i < trendCard.length;i++){
//   list.push(trendWord[i].innerText)
// }
// console.log(list)
// for(let i = 0; i < trendCard.length; i++){
//   let cardOne = trendCard[i]
//   let cardWord = trendWord[i]
//   cardWord.addEventListener("click", console.log("clicked"))
//     // getImages(pageno)
// }

trendCard.forEach((box,i) => {
  box.addEventListener("click", ((index) => {
   input = trendWord[i].innerText
   console.log(trendWord[i].innerText)
   getImages(pageno)
  }))
})












