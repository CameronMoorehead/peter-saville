$(document).ready(() => {
  const jsonURL = "data/image-module-data.json"
  $.getJSON(jsonURL, function(json) {
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
      <span class="prev">&larr;</span>
      <h3 class="modal-title">${title}</h3>
      <img src=${path} class="modal-image">
      <p>${des}</p>
      <span class="next">&rarr;</span>
      <span class="exit" onclick="exitModal()">&times;</span>
    </div>`
  $("body").append("<div class='blackout'></div>")
  $("body").append(modal)
}

function exitModal() {
  $(".blackout").remove()
  $(".modal").remove()
}
