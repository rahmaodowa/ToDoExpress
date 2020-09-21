var trash = document.getElementsByClassName("fa-trash");
var complete = document.getElementsByClassName("fa fa-check");


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const todo = this.parentNode.parentNode.childNodes[1].innerText
        fetch('ToDos', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': todo
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

Array.from(complete).forEach(function (element) {
  element.addEventListener('click', function () {
    const toDo = this.parentNode.parentNode.childNodes[1]
    toDo.classList.toggle("completed");
  });
});
