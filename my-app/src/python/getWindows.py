
import pyautogui
import json 

windows = []

for x in pyautogui.getAllWindows():  
    if(x.title != ''):
        windows.append(x.title)\
        
        
y = json.dumps(windows)

print(y)