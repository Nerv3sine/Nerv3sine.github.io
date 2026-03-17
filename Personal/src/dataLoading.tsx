export interface btnDetails {
  label: string
  link: string
}

export interface projData {
  image: string
  caption: string
  subCaption: string
  buttons: btnDetails[]
  tags: string[]
  teammates: number[]
}

// function btnInfoRetrieval

// export function jsonToProj(data: any[]){
//   return data.map((p) => {
//     return {
//       img: p["image"],
//       caption: p["caption"],
//       subCaption: p["subCaption"],
//       btns: p["buttons"]
//     }
//   })
// }