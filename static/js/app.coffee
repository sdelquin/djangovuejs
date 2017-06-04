app = new Vue
    el: "#app"
    delimiters: ["[[", "]]"]
    http:
        headers:
            "X-CSRFToken": $("[name='csrfmiddlewaretoken']").val()
    data:
        jobs: null
        job:
            title: null
            description: null
        errors:
            title: null
            description: null
    methods:
        addJob: ->
            this.errors =
                title: null
                description: null
            this.$http.post("/api/jobs/", this.job).then(
                (response) ->
                    this.jobs.push(response.data)
                    this.job =
                        title: null
                        description: null
                    $("#title").focus()
                (response) ->
                    if response.data.title
                        this.errors.title = response.data.title.join()
                    if response.data.description
                        this.errors.description = response.data.description.join()
            )
        removeJob: (index) ->
            url = "/api/jobs/#{this.jobs[index].id}"
            this.$http.delete(url)
            this.jobs.splice(index, 1)
    mounted: ->
        this.$http.get("/api/jobs/").then(
            (response) ->
                this.jobs = response.body
            (response) ->
                console.log(response)
        )
