f = open('C:\\Users\\derro\\Downloads\\PyTest.txt' , 'r')
g = open("datafile_fixed.txt", "w")

for line in f:
    if line.strip():
        g.write("\t".join(line.split()[1:]) + "\n")

f.close()
g.close()
