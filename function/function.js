let final_value = []

async function strcture(req, res) {
    try {
        final_value = []
        let name = req.body.user
        if (!name) {
            return res.status(400).json({ message: "user name required" })
        }
        let partner = req.body.partner
        if (!partner) {
            return res.status(400).json({ message: "partner name required" })
        }
        let regex = /^[a-z,A-Z ]{2,30}$/;
        let a = []
        console.log("regex.test(name)  : ",regex.test(name) );
        if (regex.test(name) == false) {
            console.log("please give letters only in your name")
            return res.status(400).json({message: "please give letters only in your name"})
            // validation()
        }
        name.split('').forEach(function (e) {
            a.push(e)
        });

        let b = []
        if (regex.test(partner) == false) {
            console.log("please give letters only in partner name")
            return res.status(400).json({message: "please give letters only in your partner name"})
            // validation()
        }
        partner.split('').forEach(function (e) {
            b.push(e)
        });

        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                if (a[i] == b[j]) {
                    a.splice(i, 1, 0)
                    b.splice(j, 1, 0)
                }
            }
        }


        let c = a.concat(b)
        let uniq = []
        for (let i = 0; i < c.length; i++) {
            if (c[i] == 0) {
            } else {
                uniq.push(c[i])
            }
        }

        let data = ['f', 'l', 'a', 'm', 'e', 's']

        let get = await flems(req, res, data, uniq)
        if(final_value.length>0){
            // console.log(" final_value data : ", final_value);
            return res.status(200).json({ message: final_value[0]})
        }
        

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong " })
    }
}


async function flems(req, res, value, uniq) {
    // console.log(" value : ",value, "uniq : ",uniq);
    let findData = []
    for (let i = 0; i <= value.length; i++) {
        let count = uniq.length % value.length
        if (count == 0) {
            count = (value.length)
        }
        if (count == i) {
            let set1 = value.slice(i, value.length)
            let set2 = value.slice(0, i - 1)
            value = set1.concat(set2)
            if (value.length == 1) {
                console.log(3);
                let obj = await dataGet(req, res, value[0])
                // console.log(" obj data ", obj);
                if(obj){
                    findData.push(obj)
                }
                i = value.length + 6
                // return obj
                break;
            }
            flems(req, res, value, uniq)
        } else if (value.length == 2) {
            if (uniq.length % 2) {
                let obj = await dataGet(req, res, value[1])
                // console.log(" obj data ", obj);
                if(obj){
                    findData.push(obj)
                }
                
                i = value.length + 6
                // return obj
                break;
            } else {
                let obj = await dataGet(req, res, value[0])
                // console.log(" obj data ", obj);
                if(obj){
                    findData.push(obj)
                }
                i = value.length + 6
                // return obj
                break;
            }
        }

    }
    // console.log("findData : ",findData);
    if(findData.length>0){
        // console.log("findData : ",findData[0]);
        final_value.push(findData[0])
        return findData[0];
    }
}

 async function dataGet(req, res, sum) {
    let name = req.body.user
    let partner = req.body.partner
    // console.log("name : ",name, "partner : ",partner);
    var data = []
    // console.log(5);
    if((req.body.user == name) && (req.body.partner == partner)){
        if ('f' == sum) {
            // console.log(`${name} and ${partner} is a Friends`)
            let value = `${name} and ${partner} is a Friends`;
            data.push(value)
        } else if ('l' == sum) {
            // console.log(`${name} and ${partner} is a lovers`)
            let value = `${name} and ${partner} is a lovers`;
            data.push(value)
        } else if ('a' == sum) {
            // console.log(`${name} and ${partner} is a affection`)
            let value = `${name} and ${partner} is a affection`;
            data.push(value)
        } else if ('m' == sum) {
            // console.log(`${name} and ${partner} is a marriage couples`)
            let value = `${name} and ${partner} is a marriage couples`;
            data.push(value)
        } else if ('e' == sum) {
            // console.log(`${name} and ${partner} is a Enemy`)
            let value = `${name} and ${partner} is a Enemy`;
            data.push(value)
        } else if ('s' == sum) {
            // console.log(`${name} and ${partner} is a Brother and sister`)
            let value =`${name} and ${partner} is a Brother and sister`  ;
            data.push(value)
        } else {
            // console.log("Invalid values")
            let value = `Invalid values`;
            data.push(value)
        }
    
        // if(data.length>0){
        //     res.status(200).json({ message : data[0]})
        // }
        return data[0]
    }
   

}

module.exports = { strcture }