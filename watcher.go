package main

import (
    "log"
    "github.com/go-fsnotify/fsnotify"
    "os"
    "os/exec"
    "path/filepath"
    "regexp"
    "strings"
)

func main() {
    path := "git@acrazing.me:/var/website/work/qingguo/10-29/"
    watcher, err := fsnotify.NewWatcher()
    if err != nil {
        log.Fatal(err)
    }
    defer watcher.Close()

    done := make(chan bool)
    go func() {
        for {
            select {
            case event := <-watcher.Events:
                log.Println("event:", event)
                if strings.HasSuffix(event.Name, "_") {
                    continue
                }
                stat, err := os.Stat(event.Name)
                if err != nil {
                    log.Println("get file state error:", err)
                    continue
                }
                if stat.IsDir() {
                    watcher.Add(event.Name)
                }
                if event.Op & fsnotify.Write == 0 && event.Op & fsnotify.Rename == 0 {
                    continue
                }
                args := []string{"-vq"}
                if stat.IsDir() {
                    args[0] += "r"
                }
                args = append(args, event.Name)
                args = append(args, path + event.Name)
                cmd := exec.Command("scp", args...)
                out, err := cmd.Output()
                if err != nil {
                    log.Println("scp error:", err)
                } else {
                    log.Println("scp", args[0], args[1], args[2])
                    log.Println("output:", string(out))
                }
            case err := <-watcher.Errors:
                log.Println("error:", err)
                continue
            }
        }
    }()

    ignoreReg := "^\\.idea$|^\\.idea/|/\\.idea$|/\\.idea/" // .idea dir
    ignoreReg += "|^\\.git$|^\\.git/|/\\.git$|/\\.git/" // .git dir

    var walkFunc filepath.WalkFunc = func(path string, info os.FileInfo, err error) error {
        if err != nil {
            return err
        }
        if info.IsDir() {
            own, err := regexp.Match(ignoreReg, []byte(path))
            if own {
                // log.Println("ignore dir:", path)
                return err
            }
            return watcher.Add(path)
        }
        return nil

    }
    err = filepath.Walk("./", walkFunc)
    if err != nil {
        log.Fatalf("watch dir error: %s\n", err.Error())
    }
    <-done
}
