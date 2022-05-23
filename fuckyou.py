import win32api, win32con , win32gui
import pyautogui 


for x in pyautogui.getAllWindows():  
    if(x.title != ''):
        print(x.title)