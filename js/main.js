$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
      let username = e.target.value;
  
      // Make request to Github
      $.ajax({
          url:'https://api.github.com/users/'+username,
          data:{
            client_id:'b9315bcd5a07fcd759d8',
            client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4'
          }
      }).done(function(user){
        $.ajax({
          url:'https://api.github.com/users/'+username+'/repos',
          data:{
            client_id:'b9315bcd5a07fcd759d8',
            client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4',
            sort: 'created: asc',
            per_page: 5
          }
        }).done(function(repos){
          $.each(repos, function(index, repo){
            $('#repos').append(`
              <div class="card">
                <div class="row">
                  <div class="col-md-7">

                  <br>
                    <strong>${repo.name}</strong>: <br> ${repo.description} <br>
                  </div>
                  <div class="col-md-3">
                    <span class="badge badge-dark">Forks: ${repo.forks_count}</span> <br>
                    <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span> <br>
                    <span class="badge badge-success">Stars: ${repo.stargazers_count}</span> <br>
                  </div>
                  <div class="col-md-2">
                    <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Visit repository</a>

                    <br>
                  </div>
                </div>
              </div>
            `);
          });
        });
        $('#profile').html(`
          <div class="card border-primary mb-3" style="max-width: 100rem;">
            <div class="card-header"><h3>${user.name}</h3></div>
            <div class="card-body">
              <div class="row">
              <div class="col-md-3">
                <img class="img-thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="view-profile" href="${user.html_url}">Visit profile</a>
              </div>
              <div class="section3">
                <span class="badge badge-dark">Public Repos: ${user.public_repos}</span> <br> 
                <span class="badge badge-primary">Public Gists: ${user.public_gists}</span> <br>
                <span class="badge badge-success">Followers: ${user.followers}</span> <br>
                <span class="badge badge-info">Following: ${user.following}</span>
                </div>
                <br><br>
                <div class="section2">
                  <div class="desc1">Company: ${user.company}</li>
                  <div class="2">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                  <div class="3">Location: ${user.location}</li>
                  <div class="4">Member Since: ${user.created_at}</li>
                </ul>
                </div>
              </div>
            </div>
          </div>
          <h3 class="page-header">Latest Repos</h3>
          <div id="repos"></div>
          `);
      });
    });
  });