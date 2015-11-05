package main
import (
    "log"
    "net/http"
    "io/ioutil"
)

var fileHandler = http.FileServer(http.Dir("./"))

var handler http.HandlerFunc = func(w http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        fileHandler.ServeHTTP(w, r)
    } else {
        w.Header().Set("Content-Type", r.Header.Get("Content-Type"))
        data, _ := ioutil.ReadAll(r.Body)
        ioutil.WriteFile("a.jpg", data, 0664)
        w.Write(data)
    }
}

func main() {
    log.Fatal(http.ListenAndServe(":9999", handler))
}