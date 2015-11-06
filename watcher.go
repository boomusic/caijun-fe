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
                if strings.HasSuffix(event.Name, "_") || event.Op == fsnotify.Chmod || event.Op & fsnotify.Remove != 0 {
                    continue
                }
                // log.Println("event:", event)
                stat, err := os.Stat(event.Name)
                if err != nil {
                    log.Println("get file status error:", err)
                    continue
                }
                if stat.IsDir() {
                    watcher.Add(event.Name)
                }
                args := []string{"scp", "-vq"}
                if stat.IsDir() {
                    args[1] += "r"
                } else if event.Op & fsnotify.Write == 0 && event.Op & fsnotify.Rename == 0 {
                    continue
                }
                args = append(args, event.Name)
                args = append(args, path + event.Name)
                cmd := exec.Command(args[0], args[1:]...)
                _, err = cmd.Output()
                if err != nil {
                    log.Println("scp error:", err)
                } else {
                    log.Println(args)
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
