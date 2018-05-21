import os

def getImages(subfolder):
    """
    1. behaviour: gets a list of image files and removes non-images
    2. inputs: the location of the script, and name of the sub-folder
    containing the files. we rely on the sub-folder being adjacent to the script
    3. outputs: a list of image filenames
    """
    initial_working_dir = os.getcwd()
    project_folder = os.path.dirname(__file__)
    image_folder = project_folder + subfolder

    image_files = os.listdir(image_folder)

    image_extension, image_extension_length = ".jpeg", 5

    for index, image in enumerate(image_files):
        if image[-image_extension_length:] != image_extension:
            image_files[index] = None

    image_files = list(filter(None, image_files))

    os.chdir(initial_working_dir)

    return image_files

def makeDeck(subfolder):
    """
    1. behaviour: creates an array contining 2 entries for each of an array of
    files, and pre-pends the relpath to comply the requirements of the "deck"
    entity in the gameBoard
    2. inputs: a sub-folder containing the target files
    3. outputs: an array of file names prepended with the sub-folder, each
    occurring twice in the array
    """
    image_files = getImages(subfolder)
    card_images = []
    folder_prefix = subfolder[1:] + "/"

    for _ in range(2):
        for image in image_files:
            image_relpath = folder_prefix + image
            card_images.append(image_relpath)

    return card_images

def imagesToJS(subfolder):
    """
    1. behaviour: writes a javascript file declaring the imageDict array
    variable
    2. inputs: the sub-folder containing the files
    3. outputs: a .js file declaring the imageDict array variable
    """
    card_images = makeDeck(subfolder)

    initial_working_dir = os.getcwd()
    project_folder = os.path.dirname(__file__)
    os.chdir(project_folder)

    js_content = "const imageDict = "
    js_content += str(card_images)

    image_dict = open("imageDict.js", "w")

    image_dict.write(js_content)
    image_dict.close()

    os.chdir(initial_working_dir)

subfolder = "/assets"

imagesToJS(subfolder)
