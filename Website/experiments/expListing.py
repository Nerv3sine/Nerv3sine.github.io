from os import listdir
from os.path import isfile, join
import json
mypath = "."
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath,f))]

outputList = []
siteNames = []
for file in onlyfiles:
    
    parts = file.split(".")
    
    if(parts[1] == "html" and parts[0] != "expMain"):
        outputList.append(file)

        with open(mypath + "/" + file) as f:
            content = f.readlines()
            target = content[0].split("@")
            siteNames.append(target[1])

outputDict = {
    "sites" : outputList,
    "names" : siteNames
}

outputJSON = json.dumps(outputDict)

outputFile = open(mypath + "/siteList.json", "w")
outputFile.write(outputJSON)
outputFile.close()

print("finished!")