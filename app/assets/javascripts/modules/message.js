$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="MessageInfo">
            <div class="MessageInfo__userName">
              ${message.user_name}
            </div>
            <div class="MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
              <img class="Message__image" src="${message.image}">
          </div>
        </div>`
        return html;
    }
    else{
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="MessageInfo">
            <div class="MessageInfo__userName">
              ${message.user_name}
            </div>
            <div class="MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
    };
  }
  $('.new__message').on('submit', function(e){
    console.log(1)
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main_chat__message-field').append(html);
      $('.new__message')[0].reset();
      $('.main_chat__message-field').animate({ scrollTop: $('.main_chat__message-field')[0].scrollHeight});
      $('.output-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
      $('.output-btn').prop("disabled", false);
    });
  });
});
