from os import listdir
from os.path import isfile, join
import json
mypath = "Website/experiments"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath,f))]

outputList = []
for file in onlyfiles:
    
    parts = file.split(".")
    
    if(parts[1] == "html" and parts[0] != "expMain"):
        outputList.append(file)

outputDict = {
    "sites" : outputList
}

outputJSON = json.dumps(outputDict)

outputFile = open(mypath + "/siteList.json", "w")
outputFile.write(outputJSON)
outputFile.close()

print("finished!")