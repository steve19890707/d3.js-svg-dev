// const list = d3.select(".chart-1");
// const widthScale = d3.scaleLinear()
//     .domain([0,100]).range([0,120]);
// const rangeColor = d3.scaleLinear()
//     .domain([0,100]).range(["#98ff94","#005313"])
// let data = [
//     {
//         caption:"list",
//         width:"10",
//     },
//     {
//         caption:"list",
//         width:"20",
//     },
//     {
//         caption:"list",
//         width:"30",
//     },
//     {
//         caption:"list",
//         width:"40",
//     },
//     {
//         caption:"list",
//         width:"50",
//     },
//     {
//         caption:"list",
//         width:"60",
//     },
//     {
//         caption:"list",
//         width:"70",
//     },
//     {
//         caption:"list",
//         width:"80",
//     },
//     {
//         caption:"list",
//         width:"90",
//     },
//     {
//         caption:"list",
//         width:"100",
//     },
// ];

// const update = ()=> {
//     const updateSet = list.selectAll("li").data(data)
//     updateSet.enter()
//         .append("li")
//         .text((element,index)=>
//             ("No."+(index+1)+"-"+element.caption))
//         .style("width",(element)=>{
//             return widthScale(element.width)+"%"})
//         .style("background-color",(element)=>{
//             return rangeColor(element.width)})
//     updateSet.exit().remove();
// };
// update();

const svgdata = [
    {
    "rank": 1,
    "city": "新北市",
    "cata": "直轄市",
    "count": "4014560"
    },
    {
    "rank": 2,
    "city": "臺中市",
    "cata": "直轄市",
    "count": "2813397"
    },
    {
    "rank": 3,
    "city": "高雄市",
    "cata": "直轄市",
    "count": "2773127"
    },
    {
    "rank": 4,
    "city": "臺北市",
    "cata": "直轄市",
    "count": "2646204"
    },
    {
    "rank": 5,
    "city": "桃園市",
    "cata": "直轄市",
    "count": "2245059"
    },
    {
    "rank": 6,
    "city": "臺南市",
    "cata": "直轄市",
    "count": "1881204"
    },
    {
    "rank": 7,
    "city": "彰化縣",
    "cata": "縣",
    "count": "1272939"
    },
    {
    "rank": 8,
    "city": "屏東縣",
    "cata": "縣",
    "count": "819793"
    },
    {
    "rank": 9,
    "city": "雲林縣",
    "cata": "縣",
    "count": "681834"
    },
    {
    "rank": 10,
    "city": "新竹縣",
    "cata": "縣",
    "count": "563104"
    },
    {
    "rank": 11,
    "city": "苗栗縣",
    "cata": "縣",
    "count": "545852"
    },
    {
    "rank": 12,
    "city": "嘉義縣",
    "cata": "縣",
    "count": "503485"
    },
    {
    "rank": 13,
    "city": "南投縣",
    "cata": "縣",
    "count": "494522"
    },
    {
    "rank": 14,
    "city": "宜蘭縣",
    "cata": "縣",
    "count": "454287"
    },
    {
    "rank": 15,
    "city": "新竹市",
    "cata": "市",
    "count": "448207"
    },
    {
    "rank": 16,
    "city": "基隆市",
    "cata": "市",
    "count": "369055"
    },
    {
    "rank": 17,
    "city": "花蓮縣",
    "cata": "縣",
    "count": "326465"
    },
    {
    "rank": 18,
    "city": "嘉義市",
    "cata": "市",
    "count": "267772"
    },
    {
    "rank": 19,
    "city": "臺東縣",
    "cata": "縣",
    "count": "217074"
    },
    {
    "rank": 20,
    "city": "金門縣",
    "cata": "縣",
    "count": "140045"
    },
    {
    "rank": 21,
    "city": "澎湖縣",
    "cata": "縣",
    "count": "105192"
    },
    {
    "rank": 22,
    "city": "連江縣",
    "cata": "縣",
    "count": "13089"
    }
]
const scaleHeight = d3.scaleLinear()
    .domain([0,4014560])
    .range([0,200])
const scaleColor = d3.scaleLinear()
    .domain([0,4014560])
    .range(['orange','blue'])
// svg
const svg = d3.select(".chart-svg").append("svg");
// svg.attr("width",960)
// svg.attr("height",540)
svg.attrs({
    "width":960,
    "height":540
});
const groups = svg.selectAll("g.city")
    .data(svgdata)
    .enter()
    .append("g");
groups.append("text")
    .text(d=>d.city)
    .attrs({
        "x":(d,i)=>i*75,
        "y":500,
        "fill":"#fff",
    })
groups.append("rect")
    .style("transform-box","fill-box")
    .style("transform","translateX(34px)rotate(180deg)")
    .attrs({
        "x":(d,i)=>i*75,
        "y":465,
        "width":20,
        "fill":(d)=> scaleColor(d.count),
    })
    .transition()
    .duration(500)
    .delay((d,i)=>i*100)
    .attrs({"height":(d)=>scaleHeight(d.count)});
groups.append("text")
    .text(d=>d.count)
    .attrs({
        "x":(d,i)=>i*75,
        "y":(d)=>455-scaleHeight(d.count),
        "fill":(d)=> scaleColor(d.count),
        "font-size":"14px"
    })
let line = d3.line()
    .x((d,i)=>i*75)
    .y((d)=> -scaleHeight(d.count)+455) 
svg.append("path")
    .attrs({
        d:line(svgdata),
        "fill":"none",
        "stroke":"#fff"
    })

// pie
let pieR = 500;
let paddingWidth = 50;
let pieData = {a: 10, b: 20, c:15, d:30, e:5, f:3, g:7, h:10};
// const pieColor = d3.scaleOrdinal()
//     .domain(["a","b","c","d","e","f","g","h"])
//     .range(d3.schemeDark2)
let pieColors = [
    "gray",
    "#e91e63",
    "#03a9f4",
    "#ffb300",
    "#8bc34a",
    "#e91e63",
    "#673ab7",
    "#001d2b",
];
// const pieLinerColorsA = d3.scaleLinear()
//     .domain([0,100])
//     .range(["pink","red","black"])
const pieArea = d3.select(".chart-pie")
        .append("svg")
        .attrs({
            "width":pieR,
            "height":pieR
        }).append("g")
            .attrs({
            "transform":"translate("+ pieR/2 +"," +pieR/2+ ")",
        })
const radius = Math.min(pieR,pieR) / 2 - paddingWidth;
const pie = d3.pie().sort(null).value((d)=>d.value);
const pieDataReady = pie(d3.entries(pieData))
const arc = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 1)
    .padAngle(.075)
    .padRadius(75)
const pieGroup = pieArea.selectAll('group')
        .data(pieDataReady)
        .enter()
        .append("g");
pieGroup.append("path")
    .style("transition","0.3s")
    .attrs({
        "cursor":"pointer",
        "d": arc,
        "fill":(d,i)=> pieColors[i],
        "transform":"scale(0)",
    })
    .transition()
    .delay((d,i)=>i*100)
    .style("transform","scale(1)")
pieGroup.append("text")
    .text(d=> d.value+"%")
    .style("text-anchor","middle")
    .attrs({
        "fill":"transparent",
        "x":(d)=> {
            const center = arc.centroid(d);
            return center[0]
        },
        "y":(d)=> {
            const center = arc.centroid(d);
            return center[1]
        },
    })
    .transition()
    .duration(1000)
    .delay((d,i)=>i*100)
    .style("font-size","18px")
    .style("fill","#fff")

d3.selectAll('path').on("mouseover",function(e) {
    d3.select(this).style("transform","scale(1.075)")
});
d3.selectAll('path').on("mouseout",function(e) {
    d3.select(this).style("transform","scale(1)")
});

// other draw & bundle function
const useSVGDom = (obj)=> {
    const svgName = d3.select(obj).append("svg");
    const main = svgName.attrs({
        "width":960,
        "height":540
    }).append("g");
    // head all
    const mainHead = main.append("g");
    // ear
    const ear = [{
        leftPath:"M430 160 C395 135,385 115,420 100 Z",
        rightPath:"M530 160 C565 135,575 115,540 100 Z",
        color:"#ffc75e"
    }];
    const earAppend = mainHead.append("g").selectAll("ear")
        .data(ear)
        .enter();
    earAppend.append("path")
        .attrs({
            "d":(d)=>d.leftPath,
            'fill':(d)=>d.color,
        })
    earAppend.append("path")
        .attrs({
            "d":(d)=>d.rightPath,
            'fill':(d)=>d.color,
        })
    mainHead.append("circle")
        .attrs({
            "cx":480,
            "cy":95,
            "r":80,
            "fill":"#000",
        });
    // face
    const face = [{
        path:"M410 90 C430 20,530 20,550 90,530 207,430 207,410 90 Z",
        color:"#ffcd6f",
    }];
    mainHead.selectAll("face")
        .data(face)
        .enter()
        .append("path")
        .attrs({
            "d":(d)=>d.path,
            "fill":(d)=>d.color,
        })
        .style("transform","scale(1,1.2)")
    // eyes & eyebrow
    const eyes = [ 
        {
            size:"30",
            move:"-30",
            eyebrowDeg:"15",
            insideMove:"-28",
            bottomColor:"#fff",
            mainColor:"#000",
        },
        {
            size:"30",
            move:"30",
            eyebrowDeg:"-15",
            insideMove:"28",
            bottomColor:"#fff",
            mainColor:"#000",
        },
    ];
    const eyesAppend = mainHead.append("g").selectAll("eyes")
        .data(eyes)
        .enter();
    eyesAppend.append("circle")
        .attrs({
            "cx":(d)=> 480+(d.move*1),
            "cy":115,
            "r":(d)=>d.size/2,
            "fill":(d)=>d.bottomColor,
        });
    const eyesInside = eyesAppend.append("circle")
        .attrs({
            "cx":(d)=> 480+(d.insideMove*1),
            "cy":115,
            "r":(d)=>(d.size/2)/2,
            "fill":(d)=>d.mainColor,
        });
    eyesAppend.append("rect")
        .style("transform-box","fill-box")
        .style("transform-origin","center")
        .style("transform",
            (d)=>{
                const deg = d.eyebrowDeg;
                return "translate(-20px,-10px)rotate("+-deg+"deg)"
            }
        )
        .attrs({
            "x":(d)=> 480+(d.move*1),
            "y":100,
            "width":40,
            "height":8,
            "fill":(d)=>d.mainColor,
            "skewX":"-50%"
        })
        .transition()
        .duration(1000)
        .style("transform",
            (d)=>{
                const deg = d.eyebrowDeg;
                return "translate(-20px,0px)rotate("+deg+"deg)"
            }
        )
    // nose
    const nose = [{
        size:"40",
        mainColor:"#ffd992",
    }]
    const noseAppend = mainHead.append("g").selectAll("nose")
        .data(nose)
        .enter();
    noseAppend.append("circle")
        .style("transform-box","fill-box")
        .style("transform-origin","center")
        .style("transform","scale(0.8,0.2)")
        .attrs({
            "cx":480,
            "cy":158,
            "r":(d)=>(d.size/2),
            "fill":(d)=>d.mainColor,
        })
    noseAppend.append("circle")
        .style("transform-box","fill-box")
        .style("transform-origin","center")
        .style("transform","scale(0.4,1.2)")
        .attrs({
            "cx":480,
            "cy":142,
            "r":(d)=>(d.size/2),
            "fill":(d)=>d.mainColor,
        });
    const mouth = [{
        startPath:"M460 175 C475 210,485 210,500 175 Z",
        endPath:"M460 175 C475 185,485 185,500 175 Z",
        strokeColor:"#ffc049",
        fillColor:"#db8357"
    }]
    const mouthAppend = mainHead.append("g").selectAll("mouth")
        .data(mouth)
        .enter();
    mouthAppend.append("path")
        .attrs({
            "d":(d)=>d.startPath,
            "stroke":(d)=>d.strokeColor,
            "stroke-width":2,
            "stroke-linejoin":"round",
            'fill':(d)=>d.fillColor,
        })
        .transition()
        .duration(1000)
        .attrs({
            "d":(d)=>d.endPath,
        });
    const hair1 = [{
        path:"M0 10 C2 60,4 60,6 10,4 0,2 0,0 10 Z",
        color:"#000",
    },]
    for(i=0;i<15;i++){
        hair1.push(hair1[0]);
    };
    const hairAppendA = mainHead.append("g").selectAll("hair1")
        .data(hair1)
        .enter();
    const hiarGroup = hairAppendA.append("path")
    .style("transform-box","fill-box")
    .style("transform-origin","center top")
    .style("transform",
        (d,i)=>{
            const Random = Math.floor(5-Math.random()*10)
            const dataX = 435 + i*5
            const dataY = 35 + Random
            const dataRotate = Random
            return "translate("+dataX+"px,"+dataY+"px)rotate("+dataRotate+"deg)"
        }
    )
    .attrs({
        "d":(d)=>d.path,
        "stroke-linejoin":"round",
        'fill':(d)=>d.color,
    })
    d3.interval(function(){
        hiarGroup.transition()
        .duration(1000)
        .style("transform",
            (d,i)=>{
                const Random = Math.floor(5-Math.random()*10)
                const dataX = 435 + i*5
                const dataY = 35 + Random
                const dataRotate = Random
                return "translate("+dataX+"px,"+dataY+"px)rotate("+dataRotate+"deg)"
            }
        )
    },1000)
    mainHead.on("mousemove",()=>{
        const moveX = this.event.offsetX*0.1;
        const moveY = this.event.offsetY*0.08;
        eyesInside
        .transition()
        .duration(100)
        .attrs({
            "cx":(d)=> 432+(d.insideMove*1)+moveX,
            "cy":107+moveY,
        })
    });
    mainHead.on("mouseout",()=>{
        eyesInside
        .transition()
        .duration(500)
        .attrs({
            "cx":(d)=> 480+(d.insideMove*1),
            "cy":115,
        })
    });
};
useSVGDom(".svgDraw");