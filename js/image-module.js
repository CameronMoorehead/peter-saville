$(document).ready(() => {
  const jsonURL = "data/image-module-data.json"
  $.getJSON(jsonURL, json => {
    let imageList = ""
    $.each(json.image_module, function() {
      imageList +=
      `<img
        src=${this.path_name}
        onclick="imageModal(
          '${this.title}',
          '${this.description}',
          '${this.path_name}',
          '${this.key}'
        )"
        class="module"
      >`
    })
    $("#image-container").append(imageList)
  })
})

function imageModal(title, des, path, key) {
  let modal =
    `<div class="modal">
      <span class="prev" onclick="prevImage('${key}')">&larr;</span>
      <h3 class="modal-title">${title}</h3>
      <img src=${path} class="modal-image">
      <p>${des}</p>
      <span class="next" onclick="nextImage('${key}')">&rarr;</span>
      <span class="exit" onclick="exitModal()">&times;</span>
    </div>`
  $("body").append("<div class='blackout'></div>")
  $("body").append(modal)
}

function prevImage(key) {
  const jsonURL = "data/image-module-data.json"
  $.getJSON(jsonURL, json => {
    let imageArray = json.image_module
    let prevKey = parseInt(key) - 1
    let imageDataObject = {}
    // provide image slider looping
    if (parseInt(key) === 0) {
      prevKey = imageArray.length -1
      imageDataObject = imageArray[prevKey]
    } else {
      imageDataObject = imageArray[prevKey]
    }
    // clear from DOM for memory
    exitModal()
    return imageModal(
      imageDataObject.title,
      imageDataObject.description,
      imageDataObject.path_name,
      imageDataObject.key
    )
  })
}

function nextImage(key) {
  const jsonURL = "data/image-module-data.json"
  $.getJSON(jsonURL, json => {
    let imageArray = json.image_module
    let nextKey = parseInt(key) + 1
    let imageDataObject = {}
    // provide image slider looping
    if (parseInt(key) === imageArray.length -1) {
      nextKey = 0
      imageDataObject = imageArray[nextKey]
    } else {
      imageDataObject = imageArray[nextKey]
    }
    // clear from DOM for memory
    exitModal()
    return imageModal(
      imageDataObject.title,
      imageDataObject.description,
      imageDataObject.path_name,
      imageDataObject.key
    )
  })
}

function exitModal() {
  $(".blackout").remove()
  $(".modal").remove()
}
