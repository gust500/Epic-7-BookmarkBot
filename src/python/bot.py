from pickle import TRUE
from pyautogui import * 
import json
import cv2
import pyautogui 
import time 
import keyboard 
import random
import win32api,win32con,win32gui
print(sys.argv)
args = json.loads(sys.argv[1])
imagePath = sys.argv[2]

windowX = 10
windowY = 10

nOfBookmarks = {'covenant':0,'mystic':0,'friendship':0}
getBookmarks = args['getBookmarks']
wantBookmarks = args['wantBookmarks']
gotBookmark = {'covenant':False,'mystic':False,'friendship':False}
print(sys.argv)

def searchBookmarks(bookmarkName):
    if(int(wantBookmarks[bookmarkName]) > nOfBookmarks[bookmarkName] ):
        if(gotBookmark[bookmarkName] == False):

            bookmark = pyautogui.locateOnScreen(imagePath+bookmarkName+'.png',confidence=0.7)

            if(bookmark != None):
                print(bookmarkName)
                center = pyautogui.center(bookmark)
                pyautogui.click(x=center.x+350,y=center.y+10)
                sleep(1)
                pyautogui.click(x=windowX+450,y=windowY+350)
                sleep(0.5)
                nOfBookmarks[bookmarkName] = nOfBookmarks[bookmarkName]+1
                gotBookmark[bookmarkName] = True
    else:
        sys.exit()
while 1:
    if getBookmarks['friendship'] == False and getBookmarks['covenant'] == False and getBookmarks['mystic'] == False : sys.exit()

    sleep(1)
    if getBookmarks['friendship'] == True : searchBookmarks('friendship')
    if getBookmarks['covenant'] == True : searchBookmarks('covenant')
    if getBookmarks['mystic'] == True : searchBookmarks('mystic')

    pyautogui.moveTo(windowX+550,windowY+250)
    pyautogui.scroll(-500)
    sleep(1.75)

    if getBookmarks['friendship'] == True : searchBookmarks('friendship')
    if getBookmarks['covenant'] == True : searchBookmarks('covenant')
    if getBookmarks['mystic'] == True : searchBookmarks('mystic')
    
    

    pyautogui.click(x=windowX+150,y=windowY+445)
    sleep(1)

    pyautogui.click(x=windowX+460,y=windowY+310)
    sleep(0.5)

    print('refresh')

    gotBookmark = {'covenant':False,'mystic':False,'friendship':False}