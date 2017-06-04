var app;

app = new Vue({
  el: "#app",
  delimiters: ["[[", "]]"],
  http: {
    headers: {
      "X-CSRFToken": $("[name='csrfmiddlewaretoken']").val()
    }
  },
  data: {
    jobs: null,
    job: {
      title: null,
      description: null
    },
    errors: {
      title: null,
      description: null
    }
  },
  methods: {
    addJob: function() {
      this.errors = {
        title: null,
        description: null
      };
      return this.$http.post("/api/jobs/", this.job).then(function(response) {
        this.jobs.push(response.data);
        this.job = {
          title: null,
          description: null
        };
        return $("#title").focus();
      }, function(response) {
        if (response.data.title) {
          this.errors.title = response.data.title.join();
        }
        if (response.data.description) {
          return this.errors.description = response.data.description.join();
        }
      });
    },
    removeJob: function(index) {
      var url;
      url = "/api/jobs/" + this.jobs[index].id;
      this.$http["delete"](url);
      return this.jobs.splice(index, 1);
    }
  },
  mounted: function() {
    return this.$http.get("/api/jobs/").then(function(response) {
      return this.jobs = response.body;
    }, function(response) {
      return console.log(response);
    });
  }
});
