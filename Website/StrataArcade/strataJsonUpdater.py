import json

def newSpace():
    print("\n\n\n\n\n\n\n")

def translate(dir):
    if dir == 'U':
        return '▲'
    elif dir == 'D':
        return '▼'
    elif dir == 'R':
        return '►'
    elif dir == 'L':
        return '◄'
    else:
        return '█'

def convert(combo):
    out = ''
    for c in combo.upper():
        out += translate(c) + " "
    return out



def format(name, combo, icon):
    print(f"{name:<40}| {combo:<24}| {icon}")

def viewStratagems(data):
    choice = 1
    page = 0
    
    max = int(len(data) / 10)
    if len(data) % 10 > 0:
        max += 1

    while choice > 0:
        newSpace()
        idx = page * 10
        sCount = 0
        format("Name", "Combo", "Icon")
        while (idx < (page + 1) * 10) and idx < len(data):
            s = data[idx]
            format(s['name'], convert(s['combo']), s['icon'])
            idx += 1
            sCount += 1
        
        print("\nstratagems", (page * 10) + 1, "-", (page * 10) + sCount)
        print("page", page + 1, "of", max)

        print("\n1) Next Page")
        print("2) Previous Page")
        print("0) Exit")
        choice = int(input("Your choice: "))
        if choice == 1:
            page += 1
            if page == max:
                page = 0
        elif choice == 2:
            page -= 1
            if page < 0:
                page = max - 1
    return


def addStratagem(data):
    choice = 1
    name = ""
    combo = ""
    icon = ""
    while choice == 1:
        newSpace()
        print("New Stratagem:")
        name = input("Stratagem Display Name: ")

        while(True):
            combo = input("Stratagem Combo (U, D, R, L): ").upper()
            setList = set(list(combo))
            clean = True
            for c in setList:
                if not(c == 'U' or c == 'D' or c == 'R' or c == 'L'):
                    clean = False
                    break
            if clean == True:
                break

        folder = input("Folder Name: ")
        fileName = input("File Name: ")
        folder = folder.strip().replace(" ", "%20")
        fileName = fileName.strip().replace(" ", "%20")
        icon = folder + "/" + fileName + ".svg"

        print("Preview:")
        print(name)
        print(convert(combo))
        print(icon)

        print("\n1) Try Again")
        print("2) Save Changes")
        print("0) Exit")

        choice = int(input("Your choice: "))

    if choice == 2:
        data.append({
            "name": name,
            "combo": combo,
            "icon": icon
        })
        print(data)

    return (data, choice == 2)


def mainMenu(data):
    choice = 1
    change = False
    while choice > 0:
        newSpace()
        print("Stratagem Database Updater\n")
        print("1) View Stratagems")
        print("2) Add Stratagems")
        print("0) Exit")
        choice = int(input("Your choice: "))
        if not(choice > 0):
            print("\x1b[35m Exiting... \x1b[0m")
        elif choice == 1:
            viewStratagems(data)
        elif choice == 2:
            (data, nChange) = addStratagem(data)
            change = change or nChange
            print("\x1b[34m Database Updated! \x1b[0m")
    
    if change == True:
        with open('strata.json', 'w') as outFile:
            json.dump(data, outFile)
            outFile.close()
            print("\x1b[32m New changes saved! \x1b[0m")

f = open("strata.json", "r")

db = json.loads(f.read())
f.close()
for i in db:
    print(i)

mainMenu(db)