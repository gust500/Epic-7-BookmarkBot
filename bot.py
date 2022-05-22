from pyautogui import * 
import pyautogui 
import time 
import keyboard 
import random
import win32api, win32con , win32gui

epicWnd = win32gui.FindWindow(None,'BlueStacks App Player')

nOfBookmarks = {'covenant':0,'mystic':0,'friendship':0}
wantBookmarks = {}
gotBookmark = {'covenant':False,'mystic':False,'friendship':False}

getCovenant = input('Get Covenant Bookmarks? Y/N  :  ')

if(getCovenant.lower() == 'y'):
    getCovenant = True
    wantBookmarks['covenant'] = input('How many Covenant Bookmarks? Y/N  :  ')
else:
    getCovenant = False

getMystic = input('Get Mystic Medals? Y/N  :  ')

if(getMystic.lower() == 'y'):
    getMystic = True
    wantBookmarks['mystic'] = input('How many  Mystic Medals? Y/N  :  ')
else:
    getMystic = False

getFriendship = input('Get Friendship Bookmarks? Y/N  :  ')

if(getFriendship.lower() == 'y'):
    getFriendship = True
    wantBookmarks['friendship'] = input('How many Friendship Bookmarks? Y/N  :  ')
else:
    getFriendship = False

x0, y0, x1, y1 = win32gui.GetWindowRect(epicWnd)
w = x1 - x0 # width
h = y1 - y0 # height

windowX = 10
windowY = 10
#370
win32gui.MoveWindow(epicWnd, windowX,windowY, 830,482, False)

def searchBookmarks(bookmarkName):
    if(int(wantBookmarks[bookmarkName]) > nOfBookmarks[bookmarkName] ):
        if(gotBookmark[bookmarkName] == False):

            bookmark = pyautogui.locateOnScreen(bookmarkName+'.png',confidence=0.8)

            if(bookmark != None):
                print(bookmarkName)
                center = pyautogui.center(bookmark)
                win32api.SetCursorPos((center.x+350,center.y+10))
                win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
                win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)
                sleep(1)
                win32api.SetCursorPos((windowX+450,windowY+350))
                win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
                win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)
                sleep(2)
                nOfBookmarks[bookmarkName] = nOfBookmarks[bookmarkName]+1
    else:
        sys.exit()

while 1:
    win32api.SetCursorPos((windowX+150,windowY+200))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)
    sleep(1)
    
    if getFriendship : searchBookmarks('friendship')
    if getCovenant : searchBookmarks('covenant')
    if getMystic : searchBookmarks('mystic')

    win32api.SetCursorPos((windowX+550,windowY+250))
    win32api.mouse_event(win32con.MOUSEEVENTF_WHEEL,0,0, -1, 0)
    sleep(1)

    if getFriendship : searchBookmarks('friendship')
    if getCovenant : searchBookmarks('covenant')
    if getMystic : searchBookmarks('mystic')
    
    print('--------------')

    try:
        if keyboard.is_pressed('q'): # it will stop working by clicking q you can change to to any key
            break
        else:
            pass
    finally:
        pass

    win32api.SetCursorPos((windowX+150,windowY+445))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)
    sleep(1)

    try:
        if keyboard.is_pressed('q'): # it will stop working by clicking q you can change to to any key
            break
        else:
            pass
    finally:
        pass

    win32api.SetCursorPos((windowX+460,windowY+310))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)
    sleep(0.5)

    gotBookmark = {'covenant':False,'mystic':False,'friendship':False}