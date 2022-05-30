import sys
import win32api,win32con,win32gui
import pyautogui
pyautogui.FAILSAFE = False
emulatorName = sys.argv[1]

wnd = win32gui.FindWindow(False,emulatorName)
win32gui.ShowWindow(wnd,1)
win32gui.SetForegroundWindow(wnd)

win32gui.MoveWindow(wnd,10,10,830,482,False)
x0, y0 ,x1,y1= win32gui.GetWindowRect(wnd)


pyautogui.moveTo(x=x0+10,y=y0+10)
pyautogui.dragTo(20, 20,0.25, button='left')