from flask import Flask, render_template, request
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
cors = CORS(app)

@app.route("/interactUser", methods = ['POST', 'GET'])
def interactUser():
    # Data will be available from POST submitted by the form
    with sqlite3.connect('fakyakData.db') as con:
        if request.method == 'POST':
        
               
                    data = request.json

                    # Connect to SQLite3 database and execute the INSERT
                    
                    cur = con.cursor()
                    try:
                        cur.execute("INSERT INTO users (UserID, Username, Password, Email, CreatedAt) VALUES ((select count(*) from users),?,?,?,?)", (data['username'], data['password'], data['email'], data['time']))
                    except sqlite3.Error as e:
                        print(e)

                    con.commit()
                    msg = "Record successfully added to database"
                    print(msg)

                    return request.json
                
        
            
        else:
            cur = con.cursor()
            cur.execute("SELECT * from Users")
            return cur.fetchall()

    con.close()


            # Send the transaction message to result.html

@app.route("/checkUser", methods = ['POST', 'GET'])
def checkUser():
    # Data will be available from POST submitted by the form
   with sqlite3.connect('fakyakData.db') as con:
        if request.method == 'POST':
        
            data = request.json

            # Connect to SQLite3 database and execute the INSERT
            print("I am here")
            cur = con.cursor()
            try:
                cur.execute(f"SELECT * from users where username = '{data['username']}' and password = '{data['password']}'")
            except (sqlite3.Error, sqlite3.Warning) as e:
                print(e)
            info = cur.fetchall()
            return info
        
            

@app.route("/getUser/<userid>", methods = ['POST', 'GET'])
def getUserData(userid):
    with sqlite3.connect('fakyakData.db') as con:
        
        cur = con.cursor()
        try:
            cur.execute(f"SELECT * FROM Users U LEFT OUTER JOIN Posts P ON U.UserID=P.UserId where U.UserID = {userid}")
        except (sqlite3.Error, sqlite3.Warning) as e:
                print(e)

        return cur.fetchall()       

        

   



@app.route("/interactPost", methods = ['POST', 'GET'])
def interactPost():
    # Data will be available from POST submitted by the form
    with sqlite3.connect('fakyakData.db') as con:
        if request.method == 'POST':
            try:
                info = request.json

                userId = info['userid']
                content = info['content']
                createdAt = info['createdAt']

                # Connect to SQLite3 database and execute the INSERT
                
                cur = con.cursor()
                try:
                    cur.execute("INSERT INTO posts (PostID, UserID, Content, CreatedAt) VALUES ((select count(*) from Posts),?,?,?)",(userId, content, createdAt))
                except sqlite3.Error as e:
                     print(e)
                

                con.commit()
                msg = "Record successfully added to database"
                return request.json

            except:
                con.rollback()
                msg = "Error in the INSERT"

    
        else:
            
            cur = con.cursor()
            cur.execute("SELECT * from Posts, Users where Users.UserID = Posts.UserID")
            return cur.fetchall()

    con.close()



@app.route("/deletePost", methods = ['POST'])
def deletePost():
    # Data will be available from POST submitted by the form
    with sqlite3.connect('fakyakData.db') as con:
        try:
            info = request.json

            postid = info['postid']

            # Connect to SQLite3 database and execute the INSERT
            
            cur = con.cursor()
            try:
                cur.execute(f"DELETE FROM Posts where Posts.PostID = {postid}")
            except sqlite3.Error as e:
                    print(e)
            


            con.commit()
            msg = "Record successfully added to database"
            return request.json

        except:
            con.rollback()
            msg = "Error in the INSERT"
            return msg



    con.close()



                # Send the transaction message to result.html

if __name__ == "__main__":
    app.run(debug=True)


