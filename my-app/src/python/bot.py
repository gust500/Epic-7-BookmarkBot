from pickle import TRUE
from pyautogui import * 
import json
import cv2
import pyautogui 
import time 
import keyboard 
import random
import win32api,win32con,win32gui
import os
print("Working dir:", os.getcwd())
print("Files in here:", os.listdir("."))
args = json.loads(sys.argv[1])

windowX = 10
windowY = 10

nOfBookmarks = {'covenant':0,'mystic':0,'friendship':0}
getBookmarks = args['getBookmarks']
wantBookmarks = args['wantBookmarks']
gotBookmark = {'covenant':False,'mystic':False,'friendship':False}


def searchBookmarks(bookmarkName):
    if(int(wantBookmarks[bookmarkName]) > nOfBookmarks[bookmarkName] ):
        if(gotBookmark[bookmarkName] == False):

            bookmark = pyautogui.locateOnScreen('./src/python/'+bookmarkName+'.png',confidence=0.7)

            if(bookmark != None):
                print(bookmarkName)
                center = pyautogui.center(bookmark)
                pyautogui.click(x=center.x+350,y=center.y+10)
                sleep(1)
                pyautogui.click(x=windowX+450,y=windowY+350)
                nOfBookmarks[bookmarkName] = nOfBookmarks[bookmarkName]+1
                gotBookmark[bookmarkName] = True
    else:
        sys.exit()
while 1:
    sleep(0.15)
    if getBookmarks['friendship'] : searchBookmarks('friendship')
    if getBookmarks['covenant'] : searchBookmarks('covenant')
    if getBookmarks['mystic'] : searchBookmarks('mystic')

    pyautogui.moveTo(windowX+550,windowY+250)
    pyautogui.scroll(-500)
    sleep(1.1)

    if getBookmarks['friendship'] : searchBookmarks('friendship')
    if getBookmarks['covenant'] : searchBookmarks('covenant')
    if getBookmarks['mystic'] : searchBookmarks('mystic')
    
    print('--------------')

    try:
        if keyboard.is_pressed('q'): # it will stop working by clicking q you can change to to any key
            break
        else:
            pass
    finally:
        pass

    pyautogui.click(x=windowX+150,y=windowY+445)
    sleep(1)

    try:
        if keyboard.is_pressed('q'): # it will stop working by clicking q you can change to to any key
            break
        else:
            pass
    finally:
        pass

    pyautogui.click(x=windowX+460,y=windowY+310)
    sleep(0.5)

    gotBookmark = {'covenant':False,'mystic':False,'friendship':False}